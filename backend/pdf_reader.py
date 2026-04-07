import fitz
# pdf reader
def get_pdf(file_path):
    text=""
    pdf_reader=fitz.open(stream=file_path, filetype="pdf")

    for pages in pdf_reader:
        text+=pages.get_text()

    return text




