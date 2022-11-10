const agreecultureModel = require("../models/agreecultureModel")
const userModel = require('../models/userModel')
const validator = require("../middleware/validator");

const createAgreeculture = async function(req,res){
    try {
        const requestBody = req.body;
        const tokenId = req.userId
        
        if (!validator.isValidRequestBody(requestBody)) {
          return res.status(400).send({
            status: false,
            message: "Invalid request parameters. Please provide blog details",
          });
        }
    
        //Extract params
        const { organization, property, userId, region, field, crop_cycle_property, crop_cycle_field,crop ,isPublished} = requestBody;

       
    
        // Validation starts
        if (!validator.isValid(organization)) {
          return res
            .status(400)
            .send({ status: false, message: "Blog Title is required" });
        }
        if (!validator.isValid(property)) {
          return res
            .status(400)
            .send({ status: false, message: "Blog body is required" });
        }

        if (!validator.isValid(region)) {
            return res
              .status(400)
              .send({ status: false, message: "Blog body is required" });
          }
          if (!validator.isValid(field)) {
            return res
              .status(400)
              .send({ status: false, message: "Blog body is required" });
          }
          if (!validator.isValid(crop_cycle_property)) {
            return res
              .status(400)
              .send({ status: false, message: "Blog body is required" });
          }
          if (!validator.isValid(crop_cycle_field)) {
            return res
              .status(400)
              .send({ status: false, message: "Blog body is required" });
          }

          if (!validator.isValid(crop)) {
            return res
              .status(400)
              .send({ status: false, message: "Blog body is required" });
          }

        if (!validator.isValid(userId)) {
          return res
            .status(400)
            .send({ status: false, message: "user id is required" });
        }
        if (!validator.isValidObjectId(userId)) {
          return res.status(400).send({
            status: false,
            message: `${userId} is not a valid user id`,
          });
        }
        
        if(userId !== tokenId){
            console.log("userId",userId)
            console.log("tokenId",tokenId)

        
          return res.status(400).send({
            status: false,
            message: 'Unauthorised Access. Please login again!',
          });
        }
        const findAuthor = await userModel.findById(userId);
        if (!findAuthor) {
          return res
            .status(400)
            .send({ status: false, message: `Author does not exists.` });
        }
        
        //validation Ends
    
        const blogData = {
          organization, property, region, field, crop_cycle_property,userId, crop_cycle_field,crop,
          isPublished: isPublished ? isPublished : false,
          publishedAt: isPublished ? new Date() : null,
        };
    
    
        const newBlog = await agreecultureModel.create(blogData);
        return res.status(201).send({
          status: true,
          message: "New blog created successfully",
          data: newBlog,
        });
      } catch (error) {
        res.status(500).send({ status: false, message: error.message });
        console.log({message: error.message })
      }
}


const getAgreeBlog = async function (req, res) {
    try {
      let filterQuery = { isDeleted: false, deletedAt: null, isPublished: true };
      let queryParams = req.query;
      const { userId, category, tags, subcategory } = queryParams;
  
      if (!validator.isValidString(userId)) {
        return res
          .status(400)
          .send({ status: false, message: "Author id is required"  });
      }
      if (userId) {
        if (!validator.isValidObjectId(userId)) {
          return res.status(400).send({
            status: false,
            message: `authorId is not valid.`,
          });
        }
      }
  
      if (!validator.isValidString(category)) {
        return res.status(400).send({
          status: false,
          message: "Category cannot be empty while fetching.",
        });
      }
  
      if (!validator.isValidString(tags)) {
        return res.status(400).send({
          status: false,
          message: "tags cannot be empty while fetching.",
        });
      }
      // console.log(tags)
      // console.log(subcategory)
  
      if (!validator.isValidString(subcategory)) {
        return res.status(400).send({
          status: false,
          message: "subcategory cannot be empty while fetching.",
        });
      }
  
      if (validator.isValidRequestBody(queryParams)) {
        const { userId, organization, property,  region, field, crop_cycle_property, crop_cycle_field,crop} = queryParams;
        if (validator.isValid(userId) && validator.isValidObjectId(userId)) {
          filterQuery["userId"] = userId;
        }
        if (validator.isValid(organization)) {
          filterQuery["organization"] = organization.trim();
        }

        if (validator.isValid(property)) {
            filterQuery["organization"] = property.trim();
          }
          if (validator.isValid(region)) {
            filterQuery["organization"] = region.trim();
          }

          if (validator.isValid(field)) {
            filterQuery["organization"] = field.trim();
          }

          if (validator.isValid(crop_cycle_property)) {
            filterQuery["organization"] = crop_cycle_property.trim();
          }

          if (validator.isValid(crop_cycle_field)) {
            filterQuery["organization"] = crop_cycle_field.trim();
          }

          if (validator.isValid(crop)) {
            filterQuery["organization"] = crop.trim();
          }
        
      }
      const blog = await agreecultureModel.find(filterQuery);
      console.log(blog)
  
      if (Array.isArray(blog) && blog.length === 0) {
        return res.status(404).send({ status: false, message: "No blogs found" });
      }
      res.status(200).send({ status: true, message: "Blogs list", data: blog });
    } catch (error) {
      res.status(500).send({ status: false, Error: error.message });
    }
  };



  const updateDetails = async function (req, res) {
    try {
      
      let userIdFromToken = req.userId;
      console.log("userIdFromToken " + userIdFromToken)
      let blogId = req.params.blogId;
      let requestBody = req.body;
      const { organization, property, region, field, crop_cycle_property, crop_cycle_field,crop } = requestBody;
      
      if (!validator.isValidRequestBody(req.params)) {
        return res.status(400).send({status: false, message: "Invalid request parameters. Please provide query details"});
      }
  
      
      if (!validator.isValidObjectId(blogId)) {
        return res
          .status(400)
          .send({ status: false, message: `blogId is invalid.` });
      }
  
      if (!validator.isValidString(organization)) {
        return res
          .status(400)
          .send({ status: false, message: "organization is required for updatation." });
      }
      
      if (!validator.isValidString(region)) {
        return res
          .status(400)
          .send({ status: false, message: "region is required for updatation." });
      }

      if (!validator.isValidString(field)) {
        return res
          .status(400)
          .send({ status: false, message: "field is required for updatation." });
      }
      
      if (!validator.isValidString(crop_cycle_property)) {
        return res
          .status(400)
          .send({ status: false, message: "crop_cycle_property is required for updatation." });
      }

      if (!validator.isValidString(crop_cycle_field)) {
        return res
          .status(400)
          .send({ status: false, message: "crop_cycle_field is required for updatation." });
      }

      if (!validator.isValidString(crop)) {
        return res
          .status(400)
          .send({ status: false, message: "crop is required for updatation." });
      }
      
      if (!validator.isValidString(property)) {
        return res
          .status(400)
          .send({ status: false, message: "property is required for updatation." });
      }
      
  
      let Blog = await agreecultureModel.findOne({ _id: blogId });
      console.log(Blog)
      if (!Blog) {
        return res.status(400).send({ status: false, msg: "No such blog found" });
      }
      console.log("Blog.userId.toString() " + Blog.userId.toString())
      
      if (Blog.userId.toString() !== userIdFromToken) {
        res.status(401).send({
          status: false,
          message: `Unauthorized access! author's info doesn't match`,
        });
        return;
      }
      
      if (
        req.body.organization ||
        req.body.property ||
        req.body.field ||
        req.body.crop_cycle_property ||
        req.body.crop_cycle_field ||
        req.body.crop
      ) {
        const organization = req.body.organization;
        const property = req.body.property;
        const field = req.body.field;
        const crop_cycle_property = req.body.crop_cycle_property;
        const crop_cycle_field = req.body.crop_cycle_field
        const crop = req.body.crop
        const isPublished = req.body.isPublished;
        
        const updatedBlog = await agreecultureModel.findOneAndUpdate(
          { _id: req.params.blogId },
          {
        organization : organization,
        property : property,
        field : field,
        crop_cycle_property : crop_cycle_property,
        crop_cycle_field : crop_cycle_field,
        crop : crop,
        isPublished: isPublished,
          },
          { new: true }
        );
        if (updatedBlog.isPublished == true) {
          updatedBlog.publishedAt = new Date();
        }
        if (updatedBlog.isPublished == false) {
          updatedBlog.publishedAt = null;
        }
        return res.status(200).send({
          status: true,
          message: "Successfully updated blog details",
          data: updatedBlog,
        });
      } else {
        return res
          .status(400)
          .send({ status: false, msg: "Please provide blog details to update" });
      }
    } catch (err) {
      res.status(500).send({
        status: false,
        Error: err.message,
      });
    }
  };







  const deleteBlogById = async function (req, res) {
    try {
      //let authorIdFromToken = req.authorId;
      let id = req.params.blogId;
  
      if (!validator.isValidObjectId(id)) {
        return res
          .status(400)
          .send({ status: false, message: `BlogId is invalid.` });
      }
  
      let Blog = await agreecultureModel.findOne({ _id: id });
  
      if (!Blog) {
        return res.status(400).send({ status: false, msg: "No such blog found" });
      }
      
      let data = await agreecultureModel.findOne({ _id: id });
      if (data.isDeleted == false) {
        let Update = await agreecultureModel.findOneAndUpdate(
          { _id: id },
          { isDeleted: true, deletedAt: Date() },
          { new: true }
        );
        return res.status(200).send({
          status: true,
          message: "successfully deleted blog",
        });
      } else {
        return res
          .status(404)
          .send({ status: false, msg: "Blog already deleted" });
      }
    } catch (err) {
      res.status(500).send({ status: false, Error: err.message });
    }
  };
  

  module.exports = {createAgreeculture, getAgreeBlog, updateDetails, deleteBlogById}


 