const editorUtils = {
  colors: {
    blue: "#000091",
    white: "#FFFFFF",
    red: "#E1000F",
    mediumCumulus: "#7AB18E",
    lightCumulus: "#417DC4",
    darkCumulus: "#3558A2",
    mediumMenthe: "#009081",
    lightMenthe: "#21ABBE",
    darkMenthe: "#37635F",
    mediumTuile: "#CE614A",
    lightTuile: "#FF9575",
    darkTuile: "#AD4847",
    mediumGlycine: "#A558A0",
  },
  getEditorOptions: () => {
    return {
      readOnly: true,
      modules: {
        toolbar: [
          ["bold", "italic", "underline", "strike"],
          [{ align: [] }],

          [{ list: "ordered" }, { list: "bullet" }],
          [{ indent: "-1" }, { indent: "+1" }],

          [{ size: ["small", "medium", "large", false] }],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ["image"],
          [{ color: Object.values(editorUtils.colors).map((c) => c) }],

          ["clean"],
        ],
      },
    };
  },
};

export default editorUtils;
