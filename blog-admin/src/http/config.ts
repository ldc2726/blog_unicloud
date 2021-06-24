interface envs {
	test: any
	master: any
}
export default <envs>{
	development:{
		userapi:"https://e2ad8936-ff0a-4d4b-9e17-565fcce00ac0.bspapp.com/http",
		msgLogapi:"https://4ad780fd-7314-43e9-a81f-5daac4f25b07.bspapp.com/http"
	},
	"production":{
		userapi:"https://e2ad8936-ff0a-4d4b-9e17-565fcce00ac0.bspapp.com/http",
		msgLogapi:"https://4ad780fd-7314-43e9-a81f-5daac4f25b07.bspapp.com/http"
	},
	test: {
		userapi:"https://e2ad8936-ff0a-4d4b-9e17-565fcce00ac0.bspapp.com/http",
		msgLogapi:"https://4ad780fd-7314-43e9-a81f-5daac4f25b07.bspapp.com/http"
	},
	master: {
		userapi:"https://e2ad8936-ff0a-4d4b-9e17-565fcce00ac0.bspapp.com/http",
		msgLogapi:"https://4ad780fd-7314-43e9-a81f-5daac4f25b07.bspapp.com/http"
	}
}
