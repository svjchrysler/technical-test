const selected = "local";

const enviroments = {
  local: { url: "http://localhost:8000/api" },
  dev: { url: "0.0.0.0" },
};

export default enviroments[selected];
