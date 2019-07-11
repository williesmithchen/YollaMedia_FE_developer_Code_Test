import React, { PureComponent } from "react";
import PropTypes from "prop-types";

export default class Model extends PureComponent {
  static propTypes = {
    index: PropTypes.any,
    imgUrl: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
    handleEdit: PropTypes.func
  };

  static defaultProps = {
    index: null,
    imgUrl: "",
    title: "",
    content: "",
    handleEdit: () => console.log("handleEdit")
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
    const { handleEdit } = this.props;
    const { index, imgUrl, title, content } = this.state;
    return (
      <article>
        <div className="imgWrap">
          <img
            src={imgUrl}
            ref={img => (this.img = img)}
            onError={() => {
              if (!this.state.errored) {
                this.img.src =
                  "https://fakeimg.pl/800x450/?retina=1&text=This Image Download Failed.&font=noto&font_size=52";
              }
            }}
          />
        </div>
        <h5>{title}</h5>
        <h6>{content}</h6>
        <button className="edit" onClick={() => handleEdit(index)}>
          Edit
        </button>
      </article>
    );
  }
}
