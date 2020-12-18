import React from "react";
// import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

class App extends React.Component {
  state = {
    title: "",
    body: "",
    posts: [],
  };

  componentDidMount = () => {
    this.getBlogPost();
  };

  getBlogPost = () => {
    axios
      .get("/api")
      .then((response) => {
        const data = response.data;
        this.setState({ posts: data });
        console.log("Data has been received!!");
      })
      .catch(() => {
        alert("Error retrieving data!!!");
      });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  submit = (event) => {
    event.preventDefault();

    const payload = {
      title: this.state.title,
      body: this.state.body,
    };

    axios({
      url: "/api/save",
      method: "POST",
      data: payload,
    })
      .then(() => {
        console.log("Data has been sent to the server");
        this.resetUserInputs();
        this.getBlogPost();
      })
      .catch(() => {
        console.log("Internal server error");
      });
  };

  dltItem = (event) => {
    event.preventDefault();
    // console.log(event.target.parentNode.getAttribute("dbid"));

    const payload = {
      id: event.target.parentNode.getAttribute("dbid"),
    };

    axios({
      url: "/api/delete",
      method: "DELETE",
      data: payload,
    })
      .then(() => {
        console.log("Delete request was sent to the server");
        this.resetUserInputs();
        this.getBlogPost();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  resetUserInputs = () => {
    this.setState({
      title: "",
      body: "",
    });
  };

  displayBlogPost = (posts) => {
    if (!posts.length) return null;

    return posts.map((post, index) => (
      <div key={index} dbid={post._id} className="blog-post__display">
        <h3>{post.title}</h3>
        <p>{post.body}</p>
        <button className="dltBtn" onClick={this.dltItem}>
          X
        </button>
      </div>
    ));
  };

  render() {
    console.log("State: ", this.state);

    //JSX
    return (
      <div className="app">
        <h1>basic mern app</h1>
        <h2>add a document</h2>
        <form onSubmit={this.submit}>
          <div className="form-input">
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={this.state.title}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-input">
            <textarea
              placeholder="body"
              name="body"
              cols="30"
              rows="10"
              value={this.state.body}
              onChange={this.handleChange}
            ></textarea>
          </div>

          <button>Submit</button>
        </form>

        <div className="blog-">{this.displayBlogPost(this.state.posts)}</div>
      </div>
    );
  }
}
export default App;

// function App() {
//   // const form = {
//   //   title: "",
//   //   body: "",
//   //   posts: [],
//   // };
//   const [state, setState] = useState({
//     title: "",
//     body: "",
//     posts: ["ggg", "ddd"],
//   });

//   const getBlogPost = () => {
//     axios
//       .get("/api")
//       .then((response) => {
//         const data = response.data;
//         setState({ posts: data });
//         console.log("Data has been received!!");
//       })
//       .catch(() => {
//         alert("Error retrieving data!!!");
//       });
//   };

//   const handleChange = (e) => {
//     const target = e.target;
//     const name = target.name;
//     const value = target.value;
//     setState({ [name]: value });
//     // setState({ [name]: value });
//   };
//   // const handleChange = ({ target }) => {
//   //   const { name, value } = target;
//   //   setState({ [name]: value });
//   // };

//   const submit = (event) => {
//     event.preventDefault();

//     const payload = {
//       title: state.title,
//       body: state.body,
//     };

//     axios({
//       url: "/api/save",
//       method: "POST",
//       data: payload,
//     })
//       .then(() => {
//         console.log("Data has been sent to the server");
//         resetUserInputs();
//         getBlogPost();
//       })
//       .catch(() => {
//         console.log("Internal server error");
//       });
//   };

//   const resetUserInputs = () => {
//     setState({
//       title: "",
//       body: "",
//     });
//   };

//   const displayBlogPost = (posts) => {
//     if (!posts.length) return null;

//     return posts.map((post, index) => (
//       <div key={index} className="blog-post__display">
//         <h3>{post.title}</h3>
//         <p>{post.body}</p>
//       </div>
//     ));
//   };

//   // useEffect(() => {
//   //   getBlogPost();
//   // }, []);
//   console.log(state.posts);

//   return (
//     <div className="app">
//       <h2>Welcome to the best app ever</h2>
//       <form onSubmit={submit}>
//         <div className="form-input">
//           <input
//             type="text"
//             name="title"
//             placeholder="Title"
//             value={state.title}
//             onChange={(e) => handleChange(e)}
//           />
//         </div>
//         <div className="form-input">
//           <textarea
//             placeholder="body"
//             name="body"
//             cols="30"
//             rows="10"
//             value={state.body}
//             onChange={(e) => handleChange(e)}
//           ></textarea>
//         </div>

//         <button>Submit</button>
//       </form>

//       <div className="blog-">{displayBlogPost(state.posts)}</div>
//     </div>
//   );
// }
// export default App;
