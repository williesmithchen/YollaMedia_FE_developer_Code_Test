import React, { PureComponent } from "react";
import PropTypes from "prop-types";

export default class Model extends PureComponent {
  static propTypes = {
    index: PropTypes.any,
    imgUrl: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
    handleSave: PropTypes.func,
    handleCancel: PropTypes.func
  };

  static defaultProps = {
    index: null,
    imgUrl: "",
    title: "",
    content: "",
    handleSave: () => console.log("handleSave"),
    handleCancel: () => console.log("handleCancel")
  };

  constructor(props) {
    super(props);
    const { index, imgUrl, title, content } = props;
    this.state = {
      index,
      imgUrl,
      title,
      content
    };
  }

  render() {
    const { handleSave, handleCancel } = this.props;
    const { index, imgUrl, title, content } = this.state;
    console.log("model", index, imgUrl, title, content);
    return (
      <div id="model">
        <h3>Add Article</h3>
        <div>
          <label htmlFor="imgUrl">Image</label>
          <input
            id="imgUrl"
            ref={imgUrl => (this.imgUrl = imgUrl)}
            defaultValue={imgUrl}
          />
        </div>
        <div>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            ref={title => (this.title = title)}
            defaultValue={title}
          />
        </div>
        <div>
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            ref={content => (this.content = content)}
            rows="5"
            defaultValue={content}
          />
        </div>
        <div className="buttons">
          <button className="reverse" onClick={handleCancel}>
            Cancel
          </button>
          <button
            onClick={() =>
              handleSave({
                index,
                imgUrl: this.imgUrl.value,
                title: this.title.value,
                content: this.content.value
              })
            }
          >
            Save
          </button>
        </div>
      </div>
    );
  }
}
