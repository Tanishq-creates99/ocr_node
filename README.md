<h1>OCR img to tXt</h1>

<h3>using tesseract.js f/w , node.js backend with express framework and multer to store img file</h3>


<p>Ejs for templating frontend , where in tesseract oem (OCR engine Mode ) is custom set to 3 (this was set while testing the images of codes) </p>

One can always change mode ie: oem and psm as per their requirement  , more oem means higher possibility of reading complex data .

Multer can be configured to store img in selective location ( i have defined it to be upload folder).
It is crucial to mention enctype attribute in form ( index.ejs file ) as multipart/form-data along with mentioning method, action in form attribute . 

https://github.com/Tanishq-creates99/ocr_node/assets/81093066/3af336bd-eafc-4da0-84f0-b96b76950fc8

