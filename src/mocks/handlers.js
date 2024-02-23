import { rest } from "msw"

const baseURL = "https://kitrate-pp5-backend-47910aa247ff.herokuapp.com/"

export const handlers = [
    rest.get(`${baseURL}dj-rest-auth/user/`, (req, res, ctx) => {
        return res(ctx.json(
            {
                "pk": 5,
                "username": "aaron",
                "email": "",
                "first_name": "",
                "last_name": "",
                "profile_id": 5,
                "profile_image": "https://res.cloudinary.com/dtgt7gfx7/image/upload/v1/media/images/file_upload_icon_jztq6c"
            })
        );
    }),
    rest.post(`${baseURL}dj-rest-auth/logout/`, (req, res, ctx) => {
        return res(ctx.status(200));
    }),
]