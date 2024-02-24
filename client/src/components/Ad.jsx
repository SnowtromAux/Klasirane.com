import "../styles/Ad.css";
import { useEffect } from 'react';

const Ad = (props) => {
  const { path } = props;

  useEffect(() => {
    const fetchScriptData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/home/ad/text/${path}/`);
        const script = await response.text();

        if(!script)return;

        // const script_el = document.createElement('script');
        // script_el.src = script;
        // script_el.async = true;
        // document.head.appendChild(script_el);

        // // Initialize the ad
        // script_el.onload = () => {
        //   window.adsbygoogle = window.adsbygoogle || [];
        //   (adsbygoogle = window.adsbygoogle || []).push({});
        // };
      } catch (error) {
        console.error('Error fetching ad script:', error);
      }
    };

    fetchScriptData();
  }, [path]);

  return (
    <div className="ad-wrapper">
      <label>AD</label>
    </div>
  );
}

export default Ad;
