import Search from './assets/search.png'
import Search2 from './assets/search2.png'
import Logo from './assets/logo.png'
import Menu from './assets/menu.png'
import Loading from './Loading'
import { useState, useEffect } from "react"
import axios from "axios";


const FinalInput = () => {
    const key1 = 'AIzaSyArDN004znvqFzLucxfvLfTwjwhk0ZgMcM'
    const key2 = ' AIzaSyBpOAb-VvM5fPARf2IcLwsKM-06kZKkWEI'
    const key3 = 'AIzaSyC-840YZd_KpTYia9_qqvtF7URQjp5oHqw'
    const key4= 'AIzaSyDAd2kxk-k812X6TdXfm2USHFwb-AHmN6w'
    const key5= 'AIzaSyDSAtnx_Cvb1-q9Mn4SECH7okab6bCYozc'


    const [textvalue, setTextValue] = useState("");
    const [data, setData] = useState('')
    const [query, setQuery] = useState(false)
    const [loading, setLoading] = useState(false)
    const [fetch, setFetch] = useState(false)
    const [downloadLoading, setDownloadLoading] = useState(false)
    const[ key , setKey] = useState(key2)


    const handelSubmit = (e) => {
        e.preventDefault();
        setQuery(true)
        e.target.inputText.value = null;
        handelRequest(textvalue)
        setShowSuggestion(false)
    };


    const handelRequest = async (e) => {
        setQuery(true)
        setLoading(true)
        await axios.get('https://youtube.googleapis.com/youtube/v3/search?q=' + e + '&key=' + key + '&part=snippet&maxResults=10')
            .then(function (response) {
                setData(response.data.items)
                setFetch(true);

            })
            .catch(function (error) {
                setKey( key4 )
                
            })
        setLoading(false)
    }

    const downloadmp3 = async (e) => {
        setLoading(true)
        setDownloadLoading(true)
        const options = {
            method: "GET",
            url: "https://youtube-mp36.p.rapidapi.com/dl",
            params: { id: e },
            headers: {
                "X-RapidAPI-Key": 'dcc30b2b2fmshac3b7e241a8fc6cp1061bdjsn8937e7e638cb',
                "X-RapidAPI-Host": "youtube-mp36.p.rapidapi.com",
            },
        };
        return await axios.request(options).then((response) => { setDownloadLoading(false), setLoading(false), window.location.replace(response.data.link) })

    }

    const downloadmp4 = async (e) => {
        setLoading(true)
        setDownloadLoading(true)
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


        return await axios.request(options).then((response) => { setDownloadLoading(false), setLoading(false), window.location.replace(response.data.video.url) })
    }




    //////////////////////////////////////////


    var [search, setSearch] = useState('')
    const [searchedData, setsearchedData] = useState([])
    const [startSearch, setStartSearch] = useState(false)
    const [showSuggestion, setShowSuggestion] = useState(true)

    const handleChange = e => {
        setSearch(e.target.value)
    }

    useEffect(() => {
        
        if (search !== '') {
            axios.request(`https://justcors.com/l_bykqhcg3ll/http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=${search}`).then(res => { setStartSearch(true), setsearchedData(res.data[1]) })

        } else {
            setsearchedData('')
            setStartSearch(false)
            setShowSuggestion(true)
        }
    }, [search])

    const setInputBox = e => {
        setSearch(e)

    }





    return (
        <div  className='Frontpage '>



            {query ?


                loading ? (<>


                    {downloadLoading ?
                        <>

                            <div className=' min-h-screen w-full flex  justify-center items-center' role="status ">
                                <svg aria-hidden="true" class="   inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-green-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                                <span class="sr-only">Loading...</span>
                            </div> </>

                        :
                        <>
                            <form autoComplete='off' onSubmit={handelSubmit} className=" container text-white flex justify-center items-center">

                                <div className=" p-2 w-full  rounded-lg bg-gray-900 border-none fixed top-[-24px] left-[-1px] gird_item1 flex justify-center mt-6 ">
                                    <input
                                        name="inputText"
                                        className="  lg:mt-[0px] indent-[32px] text-blue-900  rounded-full h-[50px] w-[270px] ml-[20px] lg:h-[40px] lg:w-[700px] opacity-80 "
                                        type="text"
                                        placeholder=' Search...'
                                        onChange={(e) => { setTextValue(e.target.value), handleChange(e) }}
                                        value={search}


                                    />
                                    <button className=" ml-2 " ><img src={Search} className=' w-7  opacity-50' alt="" srcset="" /></button>

                                </div>
                            </form>
                            <div className="flex-col justify-between items-center">
                                <Loading />
                                <Loading />
                                <Loading />
                            </div>
                        </>}








                </>) : (<>
                    <form autoComplete='off' onSubmit={handelSubmit} className=" container text-white flex justify-center items-center">

                        <div  onClick={()=> showSuggestion(false)} className=" p-2 w-full  rounded-lg bg-gray-900 border-none fixed top-[-24px] left-[-1px] gird_item1 flex justify-center mt-6 ">
                            <input
                                name="inputText"
                                className=" lg:mt-[0px] indent-[32px] text-blue-900  rounded-full h-[50px] w-[270px] ml-[20px] lg:h-[40px] lg:w-[700px] opacity-100 "
                                type="text"
                                placeholder=' Search...'
                                onChange={(e) => { setTextValue(e.target.value), handleChange(e) }}
                                value={search}


                            />
                            <button className=" ml-2 " ><img src={Search} className=' w-7  opacity-50' alt="" srcset="" /></button>

                        </div>
                        <div className="  lg:left-[460px] lg:top-[50px]      grid_item2  left-[61px] top-[53px]  fixed flex justify-center">
                            <div className="  ml-[-12px]  rounded-xl  bg-white lg:w-[700px] w-[265px] ">
                                {startSearch ? <> {showSuggestion ? <>{searchedData.map(e =>

                                    <li className='  items-center flex  list-none    text-black  '>
                                        <img src={Search2} className=' w-4 h-4 ml-2  ' alt="" srcset="" />
                                        <button className=' ml-2 p-0 ' onClick={() => { setInputBox(e), setShowSuggestion(false) , handelRequest(e) }} >{e.slice(0, 25)} </button>
                                    </li>
                                )}</> : null}   </> : <></>
                                }

                            </div>
                        </div>

                    </form>

                    {fetch ? data.map(items =>
                        <>
                            <div onClick={ ()=> setShowSuggestion(false)} className="flex justify-between items-center">
                                <div role="status" class=" flex-col h-80 m-auto mt-20 w-[337px] lg:max-w-xl p-4  md:p-6 bg-[#131B21] rounded-lg  bg-opacity-50">
                                    <img loading='lazy' className=' m-auto h-48  ' src={items.snippet.thumbnails.high.url} alt="" />
                                    <h1 className=' text-white mt-2'>   {(items.snippet.title).replace(/&quot;/g, '"').replace(/&#39;/g,"'").slice(0, 30)}   </h1>

                                    <div className=" mt-4 flex justify-center space-x-2">
                                        <button onClick={() => downloadmp3(items.id.videoId)} class="inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
                                            <span class="px-2 py-2 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                                Dowbload Mp3
                                            </span>
                                        </button>
                                        <button onClick={() => downloadmp4(items.id.videoId)} class=" inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
                                            <span class="px-2 py-2 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                                Download Mp4
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </>) : null
                    }
                </>)


                : <>
                    <nav >
                        <div className=" h-[80px] flex lg:h-[90px] ml-7 mr-6  ">
                            <div className=" flex  ml-2 mt-9  lg:mt-10 lg:ml-10 "> <img src={Logo} className=' h-[100%]   rounded-full' alt="" srcset=""
                            /> <span className=' text-white mt-2 text-[20px] ml-3 lg:text-[35px] lg:mt-[-2px] lg:ml-3 '> ZunTube </span></div>

                            <img src={Menu} className=' ml-auto  h-[45%] mt-11 m-3 lg:mt-10' alt="" />
                        </div>
                    </nav>
                    <h1 className=' font-bold text-[60px]  text-green-400 text-center mt-20 lg:text-[80px] lg:mt-[90px]'>Discover <span className=' font-thin  text-white'>Videos </span></h1>



                    <form autoComplete='off' onSubmit={handelSubmit} className=" mt-[30px]  text-white flex justify-center items-center flex-wrap container">
                        <div className="gird_item1 flex justify-center">
                            <input
                                name="inputText"
                                className="  lg:ml-[70px] lg:mt-[0px] indent-[32px] text-blue-900  rounded-full h-[50px] w-[270px] ml-[20px] lg:h-[40px] lg:w-[700px] opacity-50 "
                                type="text"
                                placeholder=' Enter Title or Paste Link '
                                onChange={(e) => { setTextValue(e.target.value), handleChange(e) }}
                                value={search}


                            />
                            <button className=" ml-2 " ><img src={Search} className=' w-7  opacity-50' alt="" srcset="" /></button>

                        </div>
                        <div className="grid_item2 mt-1 flex justify-center">
                            <div className=" lg:ml-[30px] ml-[-12px]  rounded-xl  bg-white lg:w-[700px] w-[265px] opacity-70">
                                {startSearch ? <> {showSuggestion ? <>{searchedData.map(e =>

                                    <li  onClick={() => { setInputBox(e), setShowSuggestion(false) , handelRequest(e) }} className=' cursor-pointer hover:bg-slate-200 rounded-xl  items-center flex  list-none    text-black  '>
                                        <img src={Search2} className=' w-4 h-4 ml-2  ' alt="" srcset="" />
                                        <button className=' ml-2 p-0 '  >{e.slice(0, 25)} </button>
                                    </li>
                                )}</> : null}   </> : <></>
                                }

                            </div>
                        </div>


                    </form>


                    {/* 
                    <form className=" mt-[60px]  text-white flex justify-center items-center">

                        <input
                            name="inputText"
                            className=" mt-[-60px] indent-5 text-blue-900  rounded-full h-[50px] w-[270px] ml-[10px] lg:h-[40px] lg:w-[700px] opacity-50 "
                            type="text"
                            placeholder=' Search...'
                            onChange={handleChange}
                            value={search}
                        />
                        <button className=" ml-3 mt-[-55px]" >Search</button>
                    </form> */}

                </>




            }
        </div>
    )
}

export default FinalInput
