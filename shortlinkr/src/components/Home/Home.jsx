import axios from "axios";
import {useState} from "react";
import toast from "react-hot-toast"; 

function Home()
{
    //const apiUrl = "https://ulvis.net/api.php?url";
    const apiUrl = "https://v.gd/create.php?format=json&url";
    const [inputURL, setInputURL] = useState("");
    const [originalLink, setOriginalLink] = useState("");
    const [shortenLink, setShortenLink] = useState("");
    const [urls, setUrls] = useState([]);
   
    async function ShortURLFun()
    {
        try
        {
        /*const res = await fetch(`${apiUrl}=${inputURL}`, {
          mode: 'no-cors'
        });
        
        const data = await res.json();
        debugger;
        if (data?.ok) {
             debugger;
             setInputURL("");
             setOriginalLink(data?.result?.original_link);
             setShortenLink(data?.result?.short_link);
             setUrls([
                ...urls,
                {
                  originalLink: data?.result?.original_link,
                  shortenLink: data?.result?.short_link,
                },
            ]);
        }*/
          const response = await axios({
            method: 'post',
            url:`https://api.tinyurl.com/create`,
    
            params:{
              url: inputURL,
              api_token:'PDXS1XwDq33apRjAotRiBnJrinR4CFduaGwwxvw9ekmUe3Fh3xYXkb3PFxFl'
            }
          }
          );
          if(response?.data?.data?.tiny_url)
          {
              debugger;
            setInputURL("");
             setOriginalLink(response?.data?.data?.url);
             setShortenLink(response?.data?.data?.tiny_url);
             setUrls([
                ...urls,
                {
                  originalLink: response?.data?.data?.url,
                  shortenLink: response?.data?.data?.tiny_url,
                },
            ]);
          }

        }
        catch(err)
        {
              debugger;
              alert("Some error occured, Please try again.");
        }
    }
    function isUrlValid(userInput) {
        var res = userInput.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
        if(res == null)
            return false;
        else
            return true;
    }

    async function copyURL()
    {
        typeof window !== "undefined" &&
        (await window.navigator.clipboard.writeText(shortenLink));
        toast.success("Url Copied !!!");  
    }
    return (
        <div className="home">
        <div>
            <input type="url" placeholder="Please enter URL" value={inputURL} onChange ={ (e) => setInputURL(e.target.value)}/>
            <button onClick={ShortURLFun} className="shortenBtn" disabled={!isUrlValid(inputURL)}>
              Shorten it!
            </button>
        </div>
        {
            shortenLink !== "" ?
            (
                <div className="copyDiv">
                <div className="LinkDiv">
                <a href={originalLink} className="originalLink">
                   {originalLink}
                </a>
                </div>
                <div className="LinkDiv">
                <a href={shortenLink} className="shortLink">
                    {shortenLink}
                </a>
                <button  onClick={copyURL} className="copyBtn">Copy</button>
                </div>
                </div>
            )
            :""
        }
        <div className="shortenMainDiv">
        <table>
          <thead>
            {urls?.length > 0 ? (
              <tr>
                <th>Original URL</th>
                <th>Shortened URL</th>
              </tr>
            ) : (
              ""
            )}
          </thead>
          <tbody>
            {urls?.map((url, i) => (
                <tr key={i}>
                <td>
                  <a
                    href={url?.originalLink}
                    target="_blank"
                    className="originalLink"
                  >
                    {url?.originalLink}
                  </a>
                </td>
                <td>
                  <a
                    href={url?.shortenLink}
                    target="_blank"
                    className="shortLink"
                  >
                    {url?.shortenLink}
                  </a>
                </td>
              </tr> 
            ))}
          </tbody>
        </table>
        </div>
        </div>

    )
}

export default Home;