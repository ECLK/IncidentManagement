from xhtml2pdf import pisa
import pdfkit

html = """
<html>
<head>
    <meta http-equiv="content-type" content="text/html; charset=utf-8"> 
    
</head>
<body>
    HUTTO
    බයිස්කෝප් ඩවුන්ලෝඩ්
    தமிழ்
</body>
</html>
"""
# resultFile = open("test.pdf", "w+b")
# pisa.CreatePDF(html, dest=resultFile, encoding='utf-8')
# resultFile.close()

pdfkit.from_string(html, 'test.pdf')