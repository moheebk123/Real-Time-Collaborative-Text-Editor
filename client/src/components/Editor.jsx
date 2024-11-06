import PropTypes from "prop-types";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Editor = ({value, setValue}) => {
  return <ReactQuill value={value} onChange={setValue} />;
};

Editor.propTypes = {
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
};

export default Editor;
