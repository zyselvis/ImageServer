class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = { file: '', imagePreviewUrl: '' };
  }

  handleSubmit(e) {
    e.preventDefault();
	// upload the image to server directory ./image/IP_date_hour based on user IP&time 
    // call python prcessing script to process image and save to ./image/IP_date_hour_processed-> this.state.file
    console.log('handle uploading-', this.state.file);
  }

  handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result });

    };

    reader.readAsDataURL(file);
  }

  render() {
    let { imagePreviewUrl } = this.state;
    let $imagePreview = null;
	let $imageProcessed = null;
    if (imagePreviewUrl) {
      $imagePreview = React.createElement("img", { src: imagePreviewUrl });
	  $imageProcessed = React.createElement("div", { className: "previewText" }, "This is processed results");
	  //modifed here to load results image
    } else {
      $imagePreview = React.createElement("div", { className: "previewText" }, "Please select an Image for Preview");
	  $imageProcessed = React.createElement("div", { className: "previewText" }, "This is processed results");
    }

    return (
      React.createElement("div", { className: "previewComponent" },
      React.createElement("form", { onSubmit: e => this.handleSubmit(e) },
      React.createElement("input", { className: "fileInput",
        type: "file",
        onChange: e => this.handleImageChange(e)}),
      React.createElement("button", {className: "submitButton",
        type: "submit",
        onClick: e => this.handleSubmit(e)}, "Process Image")),

      React.createElement("div", { className: "imgPreview" },
      $imagePreview),
	  React.createElement("div", { className: "imgPreview" },
      $imageProcessed)));



  }}


ReactDOM.render(React.createElement(ImageUpload, null), document.getElementById("mainApp"));
