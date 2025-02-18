const User = require("../models/User");
const path = require("path");

// const cloudinary = require("../config/cloudinary");
// const multer = require("multer");
// const { CloudinaryStorage } = require("multer-storage-cloudinary");

// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: "curriculos",
//     resource_type: "auto",
//   },
// });

// const upload = multer({ storage });

async function updateProfile(req, res) {
  try {
    const { name, phone, city } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name, phone, city },
      { new: true }
    );
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar perfil" });
  }
}

async function uploadResume(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Nenhum arquivo enviado" });
    }

    const resumeUrl = `${req.file.filename}`;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: "Usuário não autenticado" });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { resume: resumeUrl },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    res.json({ message: "Currículo enviado com sucesso", resumeUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao enviar currículo" });
  }
}

async function getResume(req, res) {
  try {
    const user = await User.findById(req.params.userId);

    if (!user || !user.resume) {
      return res.status(404).json({ error: "Currículo não encontrado" });
    }

    const filePath = path.join(__dirname, "../", user.resume);
    console.log("Buscando arquivo:", filePath);
    res.sendFile(filePath);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar currículo" });
  }
}

// async function uploadResume(req, res) {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ error: "Nenhum arquivo enviado" });
//     }

//     const uploadResult = await cloudinary.uploader.upload(req.file.path, {
//       folder: "curriculos",
//       resource_type: "raw",
//     });

//     const resumeUrl = uploadResult.secure_url;
//     const userId = req.user?.id;

//     if (!userId) {
//       return res.status(401).json({ error: "Usuário não autenticado" });
//     }

//     const user = await User.findByIdAndUpdate(
//       userId,
//       { resume: resumeUrl },
//       { new: true }
//     );

//     if (!user) {
//       return res.status(404).json({ error: "Usuário não encontrado" });
//     }

//     res.json({ message: "Currículo enviado com sucesso", resumeUrl });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Erro ao enviar currículo" });
//   }
// }

// async function getResume(req, res) {
//   try {
//     const user = await User.findById(req.params.userId);
//     if (!user || !user.resume) {
//       return res.status(404).json({ error: "Currículo não encontrado" });
//     }

//     res.json({ resumeUrl: user.resume });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Erro ao buscar currículo" });
//   }
// }

async function getUserProfile(req, res) {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Erro ao obter informações do usuário" });
  }
}

module.exports = { updateProfile, uploadResume, getUserProfile, getResume };
