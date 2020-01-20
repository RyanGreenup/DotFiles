# pdf2djvu
# Autogenerated from man page /usr/share/man/man1/pdf2djvu.1.gz
complete -c pdf2djvu -s o -l output --description 'Generate a bundled multi-page document.'
complete -c pdf2djvu -s i -l indirect --description 'Generate an indirect multi-page document.'
complete -c pdf2djvu -l page-id-template --description 'Specifies the naming scheme for page identifiers.'
complete -c pdf2djvu -l page-id-prefix --description 'Equivalent to \\(lq--page-id-template=prefix{page:04*}. djvu\\(rq.'
complete -c pdf2djvu -l page-title-template --description 'Specifies the template for page titles.'
complete -c pdf2djvu -l no-page-titles --description 'Don\\*(Aqt set page titles.'
complete -c pdf2djvu -s d -l dpi --description 'Specifies the desired resolution to resolution dots per inch.'
complete -c pdf2djvu -l media-box --description 'Use MediaBox to determine page size.  CropBox is used by default.'
complete -c pdf2djvu -l page-size --description 'Specifies the preferred page size to width pixels \\(mu height pixels.'
complete -c pdf2djvu -l guess-dpi --description 'Try to guess native resolution by inspecting embedded images.  Use with care.'
complete -c pdf2djvu -l bg-slices -l bg-slices --description 'Specifies the encoding quality of the IW44 background layer.'
complete -c pdf2djvu -l bg-subsample --description 'Specifies the background subsampling ratio.  The default is 3.'
complete -c pdf2djvu -l fg-colors --description 'Try to preserve all the foreground layer colors.  This is the default.'
complete -c pdf2djvu -l monochrome --description 'Render pages as monochrome bitmaps.  With this option, --bg-.  and --fg-.'
complete -c pdf2djvu -l loss-level --description 'Specifies the aggressiveness of the lossy compression.'
complete -c pdf2djvu -l lossy --description 'Synonym for --loss-level=100.'
complete -c pdf2djvu -l anti-alias --description 'Enable font and vector anti-aliasing.  This option is not recommended.'
complete -c pdf2djvu -l no-metadata --description 'Don\\*(Aqt extract the metadata. sp By default: . sp.'
complete -c pdf2djvu -l verbatim-metadata --description 'Keep the original metadata intact.'
complete -c pdf2djvu -l no-outline --description 'Don\\*(Aqt extract the document outline.'
complete -c pdf2djvu -l hyperlinks --description 'Make hyperlink borders always visible.'
complete -c pdf2djvu -l no-hyperlinks --description 'Don\\*(Aqt extract hyperlinks.'
complete -c pdf2djvu -l no-text --description 'Don\\*(Aqt extract the text.'
complete -c pdf2djvu -l words --description 'Extract the text.  Record the location of every word.  This is the default.'
complete -c pdf2djvu -l lines --description 'Extract the text.  Record the location of every line, rather that every word.'
complete -c pdf2djvu -l crop-text --description 'Extract no text outside the page boundary.'
complete -c pdf2djvu -l no-nfkc --description 'Do not apply \\m[blue]NFKC\\m[]\\s-2\\u[2]\\d\\s+2 normalization on the text, excep…'
complete -c pdf2djvu -l filter-text --description 'Filter the text through the command-line.'
complete -c pdf2djvu -s p -l pages --description 'Specifies pages to convert.'
complete -c pdf2djvu -s j -l jobs --description 'Use n threads to perform conversion.  The default is to use one thread.'
complete -c pdf2djvu -o j0 --description 'Determine automatically how many threads to use to perform conversion.'
complete -c pdf2djvu -s v -l verbose --description 'Display more informational messages while converting the file.'
complete -c pdf2djvu -s q -l quiet --description 'Don\\*(Aqt display informational messages while converting the file.'
complete -c pdf2djvu -l version --description 'Output version information and exit.'
complete -c pdf2djvu -s h -l help --description 'Display help and exit.'
complete -c pdf2djvu -o d/--dpi --description '.'
complete -c pdf2djvu -o slice --description 'option of c44.  Consult the c44(1) manual page for details.'
complete -c pdf2djvu -l bg- --description 'and.'
complete -c pdf2djvu -l fg- --description 'options are not respected.'
complete -c pdf2djvu -o losslevel --description 'option of cjb2; consult the cjb2(1) manual page for details.'

