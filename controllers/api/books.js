// const Book = require('../../models/book');
const Book = require('../../models/book');

module.exports = {
  // index,
  show,

};

async function show(req, res) {
  try{
    const book = await Book.findById(req.params.id);
    res.status(200).json(book);
  }catch(e){
    res.status(400).json({ msg: e.message });
  }  
}
 const books = catchAsyncError(async(req,res,next)=>{
  const books = await book.find().sort({createdAt: -1});
  res.status(200).json({status:200,message:"success",books})
})
// async function index(req, res) {
//   try{
//     const book = await Book.find({}).sort('name').populate('category').exec();
//     // re-sort based upon the sortBook of the categories
//     book.sort((a, b) => a.category.sortBook - b.category.sortBook);
//     res.status(200).json(book);
//   }catch(e){
//     res.status(400).json({ msg: e.message });
//   }
// }


// const book = require('../../models/book');
// const user= require('../../../models/user.js');

// // import { AppError } from "../../utils/AppError.js";
// // import { catchAsyncError } from "../../utils/catchAsyncError.js";



// export const addBook = catchAsyncError(async(req,res,next)=>{
//     const {name,category,publisher} = req.body
//     const book = await book.insertMany({name,category,publisher,bookPhoto:req.file.filename})
//     book ? res.status(200).json({status:200,message:"success"}) : next(new AppError("failed to insert user",400))
// })


// export const getAllBooks = catchAsyncError(async(req,res,next)=>{
//     const books = await book.find().sort({createdAt: -1});
//     res.status(200).json({status:200,message:"success",books})
// })

// export const getAllBooksByName = catchAsyncError(async(req,res,next)=>{
//     let {letters} = req.params
//     const books = await book.find({name:{$regex:letters,$options:'i'}}).sort({ createdAt: -1 }).exec();
//     res.status(200).json({status:200,message:"success",books})
// })

// export const getBookById = catchAsyncError(async(req,res,next)=>{
//     const {id} = req.params
//     const book = await book.findById(id)
//     res.status(200).json({status:200,message:"success",book})
// })


// export const issueBook = catchAsyncError(async(req,res,next)=>{
//     const {bookId,issuedDurationInDays} = req.body;
//     let issuedBookUser = req.userId
//     const book = await book.findById(bookId);
//     if(book && !book.isIssued)
//     {
//         // it should be like this but to test return book I can't do that.
//         // const issuedBook = await bookModel.findByIdAndUpdate({_id:bookId},{issuedBookUser,isIssued:true,issueDate:moment(),
//         //     returnDate:moment().add(issuedDurationInDays,'days')},{new:true})
//         const issuedBook = await book.findByIdAndUpdate({_id:bookId},{issuedBookUser,isIssued:true,issueDate:moment(),returnDate:moment().add(issuedDurationInDays,'days')},{new:true})
//         if(issuedBook)
//         {
//             res.status(200).json({status:200,message:"success"})
//         }
//         else
//         {
//             next(new AppError("failed",400))
//         }
//     }

//     else
//     {
//         next(new AppError("failed",400))
//     }
// })


// export const returnBook = catchAsyncError(async(req,res,next)=>{
//     const {bookId} = req.body;
//     const issuedBookUser = req.userId;
//     const issuedBook = await book.findOne({_id:bookId,issuedBookUser})
//     if(issuedBook)
//     {
//         let late = moment().diff(issuedBook.returnDate,"days")
//         if(late<0)
//         {
//             late=0
//         }
//         const fine = late*50;
//         let returnedBook = await book.findByIdAndUpdate(bookId,{isIssued:false,late,fine},{new:true})
//         if(returnedBook)
//         {
//             await user.findByIdAndUpdate({_id:issuedBookUser},{ $push: { issuedBooks: returnedBook }})
//             await book.updateOne({_id:bookId},{$unset: { issueDate: 1,returnDate:1,late:1,fine:1,issuedBookUser:1 }})
//             res.status(200).json({status:200,message:"success"})
//         }
//         else
//         {
//             next(new AppError("failed",400))
//         }
//     }
//     else
//     {
//         next(new AppError("book not found or not issued",400))
//     }
// })


// export const getIssuedBooks = catchAsyncError(async(req,res,next)=>{
//     let _id = req.userId;
//     const user = await book.findById(_id);
//     const issuedBooks = user.issuedBooks
    
//     user ? res.status(200).json({status:200,message:"success" , issuedBooks}) : next(new AppError("failed",400))
// })


// export const getNonReturnedBooks = catchAsyncError(async(req,res,next)=>{
//     const issuedBookUser = req.userId;
//     let nonReturnedBooks = await book.find({issuedBookUser}).sort({returnDate: 1});
//     res.status(200).json({status:200,message:"success",nonReturnedBooks})
// })


// export const searchIssuedBooks = catchAsyncError(async(req,res,next)=>{
//     const {bookName} = req.params
//     let _id = req.userId;
//     const user = await user.findById(_id).sort({returnDate: 1});
//     const issuedBooks = (user.issuedBooks).filter((book) => book.name.toLowerCase().includes(bookName.toLowerCase()) )
//     user ? res.status(200).json({status:200,message:"success" , issuedBooks}) : next(new AppError("failed",400))
// })

