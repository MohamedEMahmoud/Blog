const cloudinary = require('../config/cloudinary');

class CloudinaryFile {
	constructor(files, modelName) {
		this.files = files;
		this.modelName = modelName;
	}

	upload() {
		return new Promise((resolve, reject) => {
			const fields = ['thumbnail', 'square_cover', 'rectangle_cover'];
			fields.map((field) => {
				if (field in this.files) {
					this.files[field].map((file) => {
						const imageOriginalName = file.originalname.replace(
							/\.(jpg|jpeg|png)$/,
							''
						);
						return cloudinary
							.upload_stream(
								{
									public_id: `${
										this.modelName
									}-image/${imageOriginalName}-${Date.now()}`,
									use_filename: true,
									tags: `${imageOriginalName}-tag`,
									width: 600,
									height: 600,
									crop: 'scale',
									placeholder: true,
									resource_type: 'auto',
								},

								(err, result) => {
									if (err) {
										console.error(err);
										reject(err);
									} else {
										return resolve(result.secure_url);
									}
								}
							)
							.end(file.buffer);
					});
				}
			});
		});
	}
}

module.exports = CloudinaryFile;
