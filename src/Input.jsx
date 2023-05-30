import { useState } from "react"
import axios from "axios";
import Search from '../src/assets/search.png'
import Mp3 from '../src/assets/mp3.png'
import Mp4 from '../src/assets/mp4.png'


const Input = () => {
    const [textvalue, setTextValue] = useState("");
    const [data,setData] = useState('')
    const [query,setQuery] = useState(false)
    const [loading,setLoading] = useState(false)
    const key1 = 'AIzaSyArDN004znvqFzLucxfvLfTwjwhk0ZgMcM'
    const key2= ' AIzaSyBpOAb-VvM5fPARf2IcLwsKM-06kZKkWEI'
    const handelSubmit = (e) => {
    e.preventDefault();
    e.target.inputText.value = "";
    handelRequest(textvalue)
      };


const   handelRequest =  async (e)=> {
  setLoading(true)
    await axios.get('https://youtube.googleapis.com/youtube/v3/search?q='+e+'&key='+ key1+ '&part=snippet&maxResults=10')
    .then(function (response) {
      setData(response.data.items)
      setQuery(true)
    })
    .catch(function (error) {
      console.log(error);
    })
     console.log(data)
     setLoading(false)
//videoID  = items.id.videoId,videoTitle = items.snippet.title, videoImg = items.snippet.thumbnails.high.url
}

const downloadmp3 = async (e)=>{
    const options = {
        method: "GET",
        url: "https://youtube-mp36.p.rapidapi.com/dl",
        params: { id: e},
        headers: {
          "X-RapidAPI-Key": 'dcc30b2b2fmshac3b7e241a8fc6cp1061bdjsn8937e7e638cb',
          "X-RapidAPI-Host": "youtube-mp36.p.rapidapi.com",
        },
      };
  return await axios.request(options).then((response) => window.location.replace(response.data.link))

}

const downloadmp4 = async(e)=>{
  const options = {
    method: 'GET',
    url: 'https://youtube-video-and-shorts-downloader.p.rapidapi.com/',
    params: {
      url: 'https://youtu.be/'+e
    },
    headers: {
      'X-RapidAPI-Key': 'dcc30b2b2fmshac3b7e241a8fc6cp1061bdjsn8937e7e638cb',
      'X-RapidAPI-Host': 'youtube-video-and-shorts-downloader.p.rapidapi.com'
    }
  };
  

    return await axios.request(options).then((response)=> window.location.replace(response.data.video.url))
}



  return (
    <>
    <form onSubmit={handelSubmit} className=" mt-4  flex justify-center items-center">
    <input
      name="inputText"
      onChange={(e) => setTextValue(e.target.value)}
      className=" rounded-xl  w-[250px] ml-[40px]"
      type="text"
    />
    <button  className=" ml-4" ><img src={Search} alt="" srcset="" /></button>
  </form>
<div className="">



</div>
<div className="main_container">

{query? 
loading? (<>
  <div className=" mt-10 flex justify-center">
                    <div
                      className="  inline-block h-10 w-10 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em]  text-white motion-reduce:animate-[spin_1.5s_linear_infinite]"
                      role="status"
                    ></div>
                  </div>
</>):(<>
  { data.map(items =>
            <>
            <div  className="  lg:h-[400px] w-[90%]  sm:h-[200px]  bg-gray-800 rounded-xl m-5  sub_container border-red-600  "> 
            <img className=" rounded-[25px] ml-5" width='300' height='300' src={items.snippet.thumbnails.high.url} alt="" />
            <p className=" text-orange-400 ml-8 ">{(items.snippet.title).slice(0,30)}...</p>
            <button  onClick={()=>downloadmp3(items.id.videoId)} className=" ml-14"> <img height='50'  width='50' src={Mp3} alt="" srcset="" /></button>
            <button onClick={()=>downloadmp4(items.id.videoId)} className=" ml-10"> <img height='50'  width='50' src={Mp4} alt="" srcset="" /></button>
            </div>

            </>) 
            }

</>)


: <>

<p  className=" text-white text-center   lg:text-[100px]  mt-10"> Youtube MP4/MP4 Downloader</p>

</> 




}
</div>




    </>

   


  )
}

export default Input