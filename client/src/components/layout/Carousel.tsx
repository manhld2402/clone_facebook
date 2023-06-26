import React, { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

function StoryCarousel() {
  let stories = ["hihi", "hahah"];
  return (
    <>
      <div className="story-big-container">
        <div className="news-reels-container">
          <div className="story-news-active">
            <i className="fa-sharp fa-solid fa-book-open"></i> Tin
          </div>
          <div className="story-reels">
            <i className="fa-sharp fa-solid fa-circle-play"></i> Reels
          </div>
        </div>
        <div className="Carousel-container">
          <Carousel>
            <Carousel.Item>
              <div className="story-container">
                {/* STORY BLOCK */}
                <div
                  //   onClick={handleShowCreateStory}
                  className="d-block w-25 add-story"
                >
                  <img
                    className="img-avatar"
                    // src={saveFlag.avatarDefault}
                    alt="First slide"
                  />
                  <i className="fa-solid fa-circle-plus"></i>
                  <div className="create-story">Tạo tin</div>
                </div>
                {/* STORY BLOCK END*/}

                {/* STORY BLOCK */}

                {stories.length >= 1 ? (
                  <>
                    {stories
                    //   .sort((a, b) => b.storyId - a.storyId)
                      .slice(0, 3)
                      ?.map((story, i) => (
                        <>
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
                        </>
                      ))}
                  </>
                ) : (
                  <></>
                )}
                {/* STORY BLOCK END*/}
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className="story-container">
                {/* STORY BLOCK */}
                {stories.length >= 5 ? (
                  <>
                    {stories
                    //   .sort((a, b) => b.storyId - a.storyId)
                      .slice(4, 8)
                      ?.map((story, i) => (
                        <>
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
                        </>
                      ))}
                  </>
                ) : (
                  <></>
                )}
                {/* STORY BLOCK END*/}
              </div>
            </Carousel.Item>
          </Carousel>
        </div>
      </div>
      <Modal /* show={showCreateStory} onHide={handleCloseCreateStory} */>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <div className="Dragger">
            <input type="file" name="postImage" /* onChange={handleImageChange} */ />
            <div className="img-upload">
              <img /* src={ImgPreview} */ alt="" />
              <Button variant="primary" /* onClick={handleUploadImage} */>
                Tải ảnh lên
              </Button>{" "}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" /* onClick={handleCreateStory} */>
            Đăng ảnh
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer autoClose={2500} />
    </>
  );
}

export default StoryCarousel;
