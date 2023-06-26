import React from "react";

type storyType = { user_id: number,user_name:string,user_avatar:string,storyImg:string };
export default function StoryCard(story: storyType) {
  return (
    <div>
      <div className="d-block w-25 story-img-container">
        <img
          className="img"
          //   src={story.storyImage}
          alt="First slide"
        />
      </div>
      <div className="story-avatar-active">
        <img
          className="story-avatar"
          //   src={story.avatarDefault}
          alt=""
        />
        <i className="fa-sharp fa-solid fa-circle"></i>
      </div>
    </div>
  );
}
