/**
 * NoteController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

//encryption
// try catch


module.exports = {
  
    addANote: async function(req,res){
        const loginUser=req.body;
        const noteInJson=
        {
            "title": loginUser.noteTitle,
            "description": loginUser.noteDescription
        };
        var matchedRecord=await Notes.findOne({uname: loginUser.uname});
        console.log("//");
        console.log(matchedRecord);
        console.log("//");
        if(!matchedRecord){
            console.log("doesnt exist");
            const newNotesList=[];
            newNotesList.push(noteInJson);
            await Notes.create({uname: loginUser.uname, notesList: newNotesList});
            return res.status(200).json({message: 'Successfully added a note.'});
        }else{
            console.log("exists.");
            const newNotesList=matchedRecord.notesList;
            newNotesList.push(noteInJson);
            await Notes.updateOne({uname: loginUser.uname}).set({notesList: newNotesList});
            return res.status(200).json({message: 'Successfully added a note'});
        }
    },
    listAllNotes: async function(req,res){
        const loginUname=req.body.uname;
        console.log(loginUname);
        Notes.findOne({uname: loginUname}).exec(function(err,loginUser){
            if(err){
                return res.status(400).json({message: 'Unable to fetch notes..!!'});
            }
            console.log(loginUser);
            console.log(loginUser.id);
            console.log(loginUser.notesList);
            return res.status(200).json({message:'Successfully fetched Notes list.', notes: loginUser.notesList});
        })
    },
    editANote: async function(req,res){
        const loginUser=req.body;
        var matchedRecord=await Notes.findOne({uname: loginUser.uname});
        if(!matchedRecord){
            return res.status(400).json({message: 'Unable to find user note.'});
        }
        var oldNote=matchedRecord.notesList;
        console.log(oldNote);
        oldNote.forEach(element => {
            if(element.title===loginUser.noteTitle){
                element.description=loginUser.noteDescription;
            }
        });
        var newNote=oldNote;
        await Notes.updateOne({uname: loginUser.uname}).set({notesList:newNote});
        return res.status(200).json({message: 'Successfully edited the note.'});
        },
        deleteAllNotes: async function(req,res){
            const loginUser= req.body;
            var deletedRecord= await Notes.destroyOne({uname: loginUser.uname});
            if(deletedRecord){
                console.log("successfully deleted..!!");
                return res.status(200).json({message: 'Successfully deleted the record', deletedRecord: deletedRecord});
            }
            else{
                console.log("Bad request from client..!!");
                res.status(400).json({message: 'Bad request from client..!!'});
            }
        },
        deleteANote: async function(req,res){
            const loginUser=req.body;
            var matchedRecord=await Notes.findOne({uname: loginUser.uname});
            if(!matchedRecord){
                return res.status(400).json({message: 'User note not found'});
            }
            var oldNote=matchedRecord.notesList;
            var newNote=oldNote.filter(element => element.title!==loginUser.noteTitle);
            await Notes.updateOne({uname: loginUser.uname}).set({notesList: newNote});
            return res.status(200).json({message: 'Successfully deleted the note.'})
        }
};