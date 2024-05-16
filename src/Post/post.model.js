import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  link: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  Comments: [  // Asegúrate de que el campo esté definido como 'Comments' aquí
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment", // Esto debe coincidir con el nombre del modelo de los comentarios
    },
  ],
  status: {
    type: Boolean,
    default: true,
  },
});


export default mongoose.model("Post", postSchema);
