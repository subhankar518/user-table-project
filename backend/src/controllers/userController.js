
const User= require("../schema/user")

 const createUser= async (req, res) => {
    try {
      
      userObject= req?.body
      let response=[]
      if(userObject?.length){
        for(let i=0;i<userObject.length;i++)
        {
          const res= await User.create(userObject[i]);
          response.push(res)         
        }
        res.status(201).send(response);
      } 
      
    } catch (error) {
      res.status(400).send(error);
    }
  };

 const getUser=  async (req, res) => {
    try {
      const {id}= req?.body
      const users = await User.findById(id);
      res.send(users);
    } catch (error) {
      res.status(500).send(error);
    }
  };

  const getAllUsers = async (req, res) => {
    try {
      const users = await User.find(); 
      res.status(200).json(users); 
    } catch (error) {
      res.status(500).json({ message: 'Error fetching users', error });
    }
  };

  const updateUser = async (req, res) => {
    try {
      const { id } = req?.params;
      const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: 'Error updating user' });
    }
  };

  const deleteUsers = async (req, res) => {
    try {
      const { ids } = req.body;
      await User.deleteMany({ _id: { $in: ids } });
      res.json({ message: 'Users deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting users' });
    }
  };

  module.exports={createUser,getUser,updateUser,deleteUsers,getAllUsers }
  