import axios from "axios"


axios.defaults.baseURL = 'https://kitrate-pp5-backend-47910aa247ff.herokuapp.com/';
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
axios.defaults.withCredentials = true;