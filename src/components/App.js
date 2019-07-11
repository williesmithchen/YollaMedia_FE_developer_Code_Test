import React from "react";

import datas from "../../public/fakeData.json";

import Article from "../components/Article";
import Model from "../components/Model";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      datas,
      selectData: {
        index: null,
        imgUrl: "",
        title: "",
        content: ""
      },
      editMode: false
    };
  }

  handleSave(newObj = {}) {
    console.log("handleSave", newObj);
    this.setState(state => {
      const { index, imgUrl, title, content } = newObj;
      const isNotEmpty = imgUrl !== "" && title !== "" && content !== "";
      const newDatas = state.datas;
      if (index === null && isNotEmpty) {
        newDatas.push(newObj);
      }
      if (index !== null && isNotEmpty) {
        newDatas[index] = { imgUrl, title, content };
      }
      console.log("newDatas", newDatas);
      return {
        ...state,
        datas: newDatas
      };
    });
    this.toggleModel();
  }

  handleEdit(index = null) {
    console.log("handleEdit");
    if (index !== null) {
      this.setState(state => {
        const selectData = state.datas[parseInt(index, 10)];
        console.log("selectData", index, state.datas, state.datas[index]);
        return {
          ...state,
          selectData: {
            index,
            ...selectData
          }
        };
      });
      this.toggleModel();
    }
  }

  toggleModel(reset = false) {
    console.log("toggleModel");
    this.setState(state => {
      return {
        ...state,
        selectData: reset ? {} : state.selectData,
        editMode: !state.editMode
      };
    });
  }

  render() {
    const { datas = [], selectData, editMode = false } = this.state;
    console.log("datas", datas);
    return (
      <main className={editMode && "mask"}>
        <ul>
          {datas.map((data, index) => (
            <li key={`li-${index}`}>
              <Article
                key={`articel-${data.title}-${index}`}
                {...data}
                index={index}
                handleEdit={index => this.handleEdit(index)}
              />
            </li>
          ))}
        </ul>
        {editMode && (
          <Model
            {...selectData}
            handleSave={obj => this.handleSave(obj)}
            handleCancel={() => this.toggleModel()}
          />
        )}
        {!editMode && (
          <button id="Add" onClick={() => this.toggleModel(true)}>
            + Add New
          </button>
        )}
      </main>
    );
  }
}

export default App;
