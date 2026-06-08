"use client";

import { useState } from "react";
import CreatePostForm from "@/components/SocialFeed/CreatePostForm";
import JasonHeierPost from "@/components/SocialFeed/JasonHeierPost";
import LeftSidebar from "@/components/SocialFeed/LeftSidebar";
import PageFooter from "@/components/SocialFeed/PageFooter";
import PopularChannels from "@/components/SocialFeed/PopularChannels";
import RichardSmithPost from "@/components/SocialFeed/RichardSmithPost";
import RightSidebar from "@/components/SocialFeed/RightSidebar";
import SophieHeadrickPost from "@/components/SocialFeed/SophieHeadrickPost";

export default function SocialFeed() {
  const [open1, setOpen1] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [toggle2, setToggle2] = useState(false);

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="row">
          <div className="col-xl-3 theiaStickySidebar">
            <LeftSidebar toggle={toggle} setToggle={setToggle} />
          </div>
          <div className="col-xl-6">
            <div>
              <CreatePostForm />
              <PopularChannels />
              <RichardSmithPost open1={open1} setOpen1={setOpen1} />
              <JasonHeierPost />
              <SophieHeadrickPost toggle2={toggle2} setToggle2={setToggle2} />
            </div>
          </div>
          <div className="col-xl-3 theiaStickySidebar">
            <RightSidebar />
          </div>
        </div>
        <PageFooter />
      </div>
    </div>
  );
}
