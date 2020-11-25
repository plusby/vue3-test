export default {
    proxy: {
        "/api": {
            target: "http://192.168.124.1:3000/src",
            rewrite: (path) => path.replace(/^\/mock/,"")
        }
    }
}