"use client";
import Image from "next/image";
import Card from "./components/Card";
import { useRef } from "react";
import Faq from "./components/faq";
export default function Home() {
  const backgroundImageStyle = {
    backgroundImage: "url(/bg-img.png)",
    backgroundSize: "cover", // Ensures the image covers the container
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "80vh", // Adjust as needed
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  };
  const backgroundImageStyle2 = {
    backgroundImage: "url(/bg-cloud.avif)",
    backgroundSize: "cover", // Ensures the image covers the container
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    opacity: 0.9,
  };
  const cardcontent = [
    { title: "Engineer's Stride", src: "./engstride.jfif" },
    { title: "UU Picasso", src: "./picasso.jfif" },
    { title: "Crack N Code", src: "./crackncode.jfif" },
    { title: "HTML Combat", src: "./webdesign.jfif" },
    { title: "BGMI Badshah", src: "BGMI-Background-Images.jpg" },
    { title: "HTML Combat", src: "./webdesign.jfif" },
    { title: "Anyday Anime", src: "anime.jfif" },
    { title: "HTML Combat", src: "./webdesign.jfif" },
    { title: "Mr. & Ms. UU", src: "uu.jfif" },
    { title: "Innovate India", src: "innovateindia.jfif" },
    { title: "Head Scratch", src: "headscratch.jfif" },
    { title: "Digital India", src: "robo.jfif" },
    { title: "Pirates", src: "pirates.jfif" },
    { title: "Life of an Engineer", src: "engineerlife.jfif" },
    { title: "Cook Without Fire", src: "cookwofire.jfif" },
    { title: "Canvas on Faces", src: "canvasonfaces.jfif" },
    { title: "Engineer's Got Talent", src: "talent.jfif" },
    { title: "Character Clash", src: "cosplay.jfif" },
  ];
  const faqcontent = [
    {
      ques: "What is Engineer's Day?",
      ans: "A day to celebrate engineering with fun events!",
    },
    {
      ques: "How do I register for events?",
      ans: "Fill out the registration link, it's easy!",
    },
    {
      ques: "What events are happening this year?",
      ans: "Fun run, Code War, Web War, and more!",
    },
    {
      ques: "Can I bring my friends?",
      ans: "Absolutely! The more, the merrier!",
    },
  ];
  const eventref = useRef();
  return (
    <>  
      <div
        className="flex flex-col items-center justify-center gap-5"
        style={backgroundImageStyle}
      >
        <div className="font-bold text-white font-sans text-5xl md:text-8xl">
          {" "}
          Engineer&apos;s Day{" "}
        </div>
        <div className=" text-white font-serif md:text-4xl">
          Unleash Your Inner Genius and Joint the Fun!
        </div>
        <button
          className="border-white border-2 font-bold text-xl py-2 px-3 bg-transparent text-white rounded-3xl"
          onClick={() => {
            eventref.current?.scrollIntoView({
              behavior: "smooth",
            });
          }}
        >
          Explore the events
        </button>
      </div>
      <div className="flex flex-col items-center justify-center py-10">
        <div className="font-bold text-center text-5xl my-5 md:text-7xl font-sans">
          Who We Are
        </div>
        <div className="flex flex-col-reverse md:flex-row items-center justify-center gap-3">
          {/* <br /> */}
          <div className="flex-2 mx-5 flex flex-col" style={{flex: 2}}>
            {who_are_we.split("\n").map((item)=>{
              return <p className="text-lg lg:px-10">{item}</p>
            })}
          </div>
          <div className="flex justify-center flex-1">
            <img src={"/circle.png"} alt="circle.img" />
          </div>
        </div>
      </div>
      <div style={{ backgroundColor: "#416165" }} className=" py-10">
        <div
          style={{ backgroundColor: "#D0CDD7" }}
          className=" p-14 rounded-2xl w-[80%] mx-auto flex gap-12 flex-col items-center justify-center"
        >
          <div className="font-bold lg:text-7xl text-3xl ">
            {" "}
            Don&apos;t Miss Out on the Fun!
          </div>
          <div className="font-semibold font-sans text-2xl lg:4xl">
            Click the below images for registration.
          </div>
        </div>
        <div
          ref={eventref}
          className="text-center font-semibold  text-6xl mt-28 text-white"
        >
          Epic Events
        </div>
        <div className="flex p-5 lg:p-10 flex-wrap gap-10 justify-center">
          {cardcontent.map((item) => {
            return <Card title={item.title} key={item.title} src={item.src} />;
          })}
        </div>
        <div className="text-center mb-10 font-serif pt-9 font-bold text-5xl text-white">
          FAQS
        </div>
        <div className="flex flex-col gap-3 lg:px-[200px] px-3 flex-wrap ">
          {faqcontent.map((item) => {
            return <Faq ques={item.ques} key={item.ans} ans={item.ans} className="flex-1" />;
          })}
        </div>
      </div>

      {/* ------- Numbers ------- */}
      <div className="py-20 flex items-center justify-around bg-white flex-col lg:flex-row gap-y-10">
        <div className="flex flex-col items-center justify-center">
          <div className="text-blue-700 font-semibold text-4xl">500+</div>
          <div className="font-semibold text-3xl"> Participants</div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="text-blue-700 font-semibold text-4xl">10+</div>
          <div className="font-semibold text-3xl"> Exciting Events</div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="text-blue-700 font-semibold text-4xl">2</div>
          <div className="font-semibold text-3xl"> Days of Fun</div>
        </div>
      </div>

      {/* ------- Follow US ------- */}
      <div className="bg-blue-200">
        <div className="flex p-7 items-center gap-7 flex-col lg:flex-row">
          <div className="flex flex-col gap-8 items-center w-[50vw]">
            <div className="text-center font-bold text-6xl">
              Follow Us Online
            </div>
            <div className="font-serif text-xl">
              Be connected with us on instagram for updates.
            </div>
          </div>
          <div>
            {/* {" "} */}
            <img
              src="followus.jfif"
              alt="Image"
              className="w-[100%] rounded-xl"
            />
          </div>
        </div>
      </div>
      <div className="text-center font-semibold text-2xl p-5 bg-black text-white">
        &copy;2024 Engineers Day. All rights reserved.
      </div>
    </>
  );
}

const who_are_we = `Welcome to ENGINEER'S DAY MAHOTSAVA2024 , the ultimate celebration of engineering brilliance! We are the masterminds behind the most electrifying Engineer's Day event, where creativity meets competition in a whirlwind of excitement.
Our mission? To showcase the incredible talents of engineers while having a blast!
Join us as we transform ordinary days into extraordinary experiences. Get ready to laugh, learn, and unleash your inner engineer!`