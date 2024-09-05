
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

  const getAllUsers = async (req, res) => {
    try {
      const users = await User.find(); 
      res.status(200).json(users); 
    } catch (error) {
      res.status(500).json({ message: 'Something Went Wrong', error });
    }
  };

  // const updateUser = async (req, res) => {
  //   try {
  //     const { id } = req?.params;
  //     const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
  //     res.json(updatedUser);
  //   } catch (error) {
  //     res.status(500).json({ message: 'User not updated, Something went wrong !' });
  //   }
  // };

  const deleteUsers = async (req, res) => {
    try {
      const { ids } = req.body;
      await User.deleteMany({ _id: { $in: ids } });
      res.json({ message: 'Users deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'User not deleted, Something went wrong ' });
    }
  };

  module.exports={createUser,deleteUsers,getAllUsers }
  