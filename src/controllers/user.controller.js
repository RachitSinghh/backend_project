import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const registerUser = asyncHandler(async (req, res) => {
  // user detail from frontend
  // validation - not empty
  // check if user already exists: username, email
  // check for images,check for avatar
  // upload them to cloudinary
  // create user object - create entry in db
  // remove password and refrest toek field from response
  // check for user creation
  // return response

  const { fullName, email, username, password } = req.body;
  console.log("email: ", email);

  // if(fullName === ""){
  //   throw new ApiError(400, "Full name is required")
  // }

  if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are requied");
  }


  const existedUser = await User.findOne({
    $or: [{ username }, { email }]
  })


  if(existedUser){
    throw new ApiError(409,"User with email or username already exists");
  }
  const avatarLocalPath = req.files?.avatar[0]?.path; 
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if(!avatarLocalPath){
    throw new ApiError(400, "Avatar file is required")
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath)
  const coverImage = await uploadOnCloudinary(coverImageLocalPath)

  if(!avatar){
    throw new ApiError(400, "Avatar file is required")
  }

  User.create({
    fullName, 
    avatar: avatar.url,
    coverImage: coverImage?.url || "", 
    email, 
    password, 
    username: username.toLowerCase()
  })

  const createdUser = await User.findById(User._id).select("-password -refreshToken")


  if(!createdUser){
    throw new ApiError(500, "Something went wrong while ")
  }

  return res.status(201).json(
    new ApiResponse(200, createdUser, "User registered Successfully")
  )

});

const loginUser = asyncHandler (async ( req,res) =>{
  // req body -> data
  // username or email
  // find the user 
  // password check 
  // access and refresh token 
  // send cookie

  const {email, username, password} = req.body

  if(!username || !email){
    throw new ApiError(400, "Username or password is required")
  }

  const user = await User.findOne({
    $or: [{username}, {email}]
  })

  if(!user){
    throw new ApiError(404, "User doesn not exists");
  }


  


})

export { registerUser };
