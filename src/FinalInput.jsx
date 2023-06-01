
import Search from './assets/search.png'
import Facebook from './assets/facebook.png'
import Twitter from './assets/twitter.png'
import Inastagram from './assets/instagram.png'
import Logo from './assets/Logo.png'
import Menu from './assets/menu.png'
import Loading from './Loading'
import { useState } from "react"
import axios from "axios";
const FinalInput = () => {

    const [textvalue, setTextValue] = useState("");
    const [data, setData] = useState('')
    const [query, setQuery] = useState(false)
    const [loading, setLoading] = useState(false)
    const key1 = 'AIzaSyArDN004znvqFzLucxfvLfTwjwhk0ZgMcM'
    const key2 = ' AIzaSyBpOAb-VvM5fPARf2IcLwsKM-06kZKkWEI'



    const handelSubmit = (e) => {
        e.preventDefault();
        e.target.inputText.value = null;
        handelRequest(textvalue)
        
    };


    const handelRequest = async (e) => {

        setLoading(true)
        await axios.get('https://youtube.googleapis.com/youtube/v3/search?q=' + e + '&key=' + key1 + '&part=snippet&maxResults=10')
            .then(function (response) {
                setData(response.data.items)
                setQuery(true)
               
                
            })
            .catch(function (error) {
                console.log(error);
            })
        setLoading(false)
    }

    const downloadmp3 = async (e) => {
        setLoading(true)
        const options = {
            method: "GET",
            url: "https://youtube-mp36.p.rapidapi.com/dl",
            params: { id: e },
            headers: {
                "X-RapidAPI-Key": 'dcc30b2b2fmshac3b7e241a8fc6cp1061bdjsn8937e7e638cb',
                "X-RapidAPI-Host": "youtube-mp36.p.rapidapi.com",
            },
        };
        return await axios.request(options).then((response) => { setLoading(false), window.location.replace(response.data.link) })

    }

    const downloadmp4 = async (e) => {
        setLoading(true)
        const options = {
            method: 'GET',
            url: 'https://youtube-video-and-shorts-downloader.p.rapidapi.com/',
            params: {
                url: 'https://youtu.be/' + e
            },
            headers: {
                'X-RapidAPI-Key': 'dcc30b2b2fmshac3b7e241a8fc6cp1061bdjsn8937e7e638cb',
                'X-RapidAPI-Host': 'youtube-video-and-shorts-downloader.p.rapidapi.com'
            }
        };


        return await axios.request(options).then((response) => { setLoading(false), window.location.replace(response.data.video.url) })
    }

    return (
        <div className='Frontpage'>



            {query ?
                loading ? (<>
                    <form className="   text-white flex justify-center items-center">
                        <input
                            name="inputText"
                            className="  mt-12 indent-5 text-blue-900 rounded-xl h-[30px] w-[290px] ml-[40px] lg:h-[40px] lg:w-[700px] opacity-50 "
                            type="text"
                            placeholder=' Search...'

                        />
                        <button className="  ml-3 mt-12" ><img src={Search} className=' w-7  opacity-50' alt="" srcset="" /></button>
                    </form>
                    <div className="flex-col justify-between items-center">
                        <Loading />
                        <Loading />
                        <Loading />
                    </div>
                </>) : (<>
                    <form onSubmit={handelSubmit} className="   text-white flex justify-center items-center">

                        <input
                            name="inputText"
                            className=" mt-4 indent-5 text-blue-900 rounded-xl h-[30px] w-[290px] ml-[40px] lg:h-[40px] lg:w-[700px] opacity-50 "
                            type="text"
                            placeholder=' Search...'
                            onChange={(e) => setTextValue(e.target.value)}

                        />
                        <button className=" ml-3 mt-4" ><img src={Search} className=' w-7  opacity-50' alt="" srcset="" /></button>
                    </form>

                    {data.map(items =>
                        <>
                            <div className="flex justify-between items-center">
                                <div role="status" class=" flex-col h-80 m-auto mt-20 max-w-sm lg:max-w-xl p-4  md:p-6 bg-[#131B21] rounded-lg  bg-opacity-50">
                                    <img  loading='lazy' className=' m-auto h-48  ' src={items.snippet.thumbnails.high.url} alt="" />
                                    <h1 className=' text-white mt-2'> {(items.snippet.title).slice(0, 30)}...  </h1>

                                    <div className=" mt-4 flex justify-center space-x-2">
                                        <button onClick={() => downloadmp3(items.id.videoId)} class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
                                            <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                                Dowbload Mp3
                                            </span>
                                        </button>
                                        <button onClick={() => downloadmp4(items.id.videoId)} class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
                                            <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                                Download Mp4
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>







                        </>)
                    }











                </>)


                : <>
                    <nav >
                        <div className=" h-[80px] flex lg:h-[90px] ml-7 mr-6  ">
                            <div className=" flex  ml-2 mt-9  lg:mt-10 lg:ml-10 "> <img src={Logo} className=' h-[100%]   rounded-full' alt="" srcset=""
                            /> <span className=' text-white mt-2 text-[20px] ml-3 lg:text-[35px] lg:mt-[-2px] lg:ml-3 '> DhzTube </span></div>

                            <img src={Menu} className=' ml-auto  h-[45%] mt-11 m-3 lg:mt-10' alt="" />
                        </div>
                    </nav>
                    <h1 className=' text-white text-center mt-4 text-[80px] lg:mt-[90px]'>Discover Videos</h1>



                    <form onSubmit={handelSubmit} className=" mt-[60px]  text-white flex justify-center items-center">

                        <input
                            name="inputText"
                            className=" indent-5 text-blue-900 rounded-xl h-[30px] w-[290px] ml-[40px] lg:h-[40px] lg:w-[700px] opacity-50 "
                            type="text"
                            placeholder=' Search...'
                            onChange={(e) => setTextValue(e.target.value)}

                        />
                        <button className=" ml-3 mt-1.3" ><img src={Search} className=' w-7  opacity-50' alt="" srcset="" /></button>
                    </form>

                    <footer className=' h-[160px] lg:h-40 '>
                        <div className=" flex text-lg  text-[#3282B8] justify-center space-x-7">
                            <p>Terms&Condition</p>
                            <p>  About us</p>
                            <p>  Contact us</p>
                        </div>
                        <div className=" flex justify-center space-x-9 mt-9  ">
                            <img className=' w-9' src={Facebook} alt="" />
                            <img className=' w-9' src={Inastagram} alt="" />
                            <img className=' w-9' src={Twitter} alt="" />
                        </div>
                        <h1 className=' mt-5 text-[25px] text-[#3282B8] text-center'>@Dhz.Co</h1>
                    </footer>

                </>




            }













        </div>
    )
}

export default FinalInput