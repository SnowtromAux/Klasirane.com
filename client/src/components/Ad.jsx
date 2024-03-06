import "../styles/Ad.css";
import { useEffect } from 'react';

const Ad = (props) => {
  const { path , page } = props;
  const compName = props.compName || "";

  useEffect(() => {
    const fetchScriptData = async () => {
      try {
        const response = await fetch(`http://15.188.118.216:3001/${page}/ad/text/${path}/${compName}`);
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
