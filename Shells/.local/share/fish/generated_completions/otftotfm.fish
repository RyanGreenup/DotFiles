# otftotfm
# Autogenerated from man page /usr/share/man/man1/otftotfm.1.gz
complete -c otftotfm -s s -l script --description 'Apply features suitable to the script system  script and language system R la…'
complete -c otftotfm -s f -l feature --description 'Activate the feature named R feature .'
complete -c otftotfm -l lf -l letter-feature --description 'Activate the feature named R feature , but only for letters.'
complete -c otftotfm -l clear-subs --description 'Limit the characters that  otftotfm will substitute.'
complete -c otftotfm -s E -l extend --description 'Widen, or extend, the font by a factor of R fac .  Like .'
complete -c otftotfm -s S -l slant --description 'Oblique, or slant, the font by R amt .  Like . M afm2tfm 1 \'s  -s option.  \' .'
complete -c otftotfm -s L -l letterspacing --description 'Letterspace each character by R amt units, where 1000 units equals one em.'
complete -c otftotfm -l math-spacing --description 'Ignore the font\'s claimed character widths, deriving horizontal metrics from …'
complete -c otftotfm -s k -l min-kern --description 'Only output kerning pairs whose absolute value is R N or larger.'
complete -c otftotfm -l space-factor --description 'Scale the width of the inter-word space by a factor of R fac .  \' . Sp.'
complete -c otftotfm -l design-size --description 'Set the output font\'s design size to R size , a value in TeX points.'
complete -c otftotfm -l fixed-width --description 'Set the font to fixed-width (its space character will have no stretch or shri…'
complete -c otftotfm -l italic-angle --description 'Set the output font\'s default italic angle to R angle , a number of degrees.'
complete -c otftotfm -l x-height --description 'Set the output font\'s x-height to R val .'
complete -c otftotfm -s e -l encoding --description 'Select the output metrics\'s base . M dvips 1 encoding.'
complete -c otftotfm -l boundary-char --description 'Set the font\'s boundary character to R char , which should either be a single…'
complete -c otftotfm -l altselector-char --description 'Set the font\'s alternate selector character to R char , which should either b…'
complete -c otftotfm -l altselector-feature --description 'Activate the feature named  feature for the  --altselector-char mechanism.'
complete -c otftotfm -l clear-alternates --description 'Limit the alternate characters that  otftotfm will select.'
complete -c otftotfm -l ligkern --description 'Add a LIGKERN R command to the encoding.'
complete -c otftotfm -l position --description 'Add a POSITION R command to the encoding.'
complete -c otftotfm -l unicoding --description 'Add a UNICODING R command to the encoding.'
complete -c otftotfm -l no-encoding-commands --description 'Ignore any LIGKERN and/or UNICODING commands in the encoding file.  \' . Sp.'
complete -c otftotfm -l no-default-ligkern --description 'Don\'t include  otftotfm \'s default LIGKERN commands.  \' . Sp.'
complete -c otftotfm -l coding-scheme --description 'Add a CODINGSCHEME to the encoding.   See ENCODINGS, below.  \' . Sp.'
complete -c otftotfm -l warn-missing --description 'Warn about encoded characters not supported by the font.'
complete -c otftotfm -l literal-encoding --description 'Select the . M dvips 1 encoding used for the font.'
complete -c otftotfm -l base-encodings --description 'Experts only.  Allow the output font to refer to existing "base" fonts.'
complete -c otftotfm -s a -l automatic --description 'Select automatic mode.  \' . Sp.'
complete -c otftotfm -s v -l vendor --description 'Set the font vendor name, which is used to locate files within the TDS.'
complete -c otftotfm -l typeface --description 'Set the font typeface name, which is used to locate files within the TDS.'
complete -c otftotfm -l no-type1 --description 'Do not use .'
complete -c otftotfm -l no-dotlessj --description 'Do not use .'
complete -c otftotfm -l no-truetype --description 'Do not install TrueType-flavored fonts.  \' . Sp.'
complete -c otftotfm -l type42 --description 'Install TrueType-flavored fonts in translated Type 42 format.  \' . Sp.'
complete -c otftotfm -l no-updmap --description 'Do not run an . M updmap 1 program.'
complete -c otftotfm -s n -l name --description 'Set the TeX name of the output font, which is used in font map files and, in …'
complete -c otftotfm -s p -l pl --description 'Output human-readable PL and VPL metrics, not binary TFM and VF metrics.'
complete -c otftotfm -l no-virtual --description 'Do not generate virtual fonts (VFs and VPLs).'
complete -c otftotfm -l no-encoding --description 'Do not generate an encoding file.  \' . Sp.'
complete -c otftotfm -l output-encoding --description 'Only generate an encoding file; do not generate any other output.'
complete -c otftotfm -l no-map --description 'Do not generate a font map line for the font.  \' . \\" . Sp . \\".'
complete -c otftotfm -l base-name --description '\\" Experts only: Set the TeX name of the "base" output font.   When .'
complete -c otftotfm -l type42-directory --description 'Set the directory used for various output types.'
complete -c otftotfm -l map-file --description 'Set file in which   otftotfm will write a font map line for the font.'
complete -c otftotfm -l glyphlist --description 'Use  file as a Adobe glyph list, which helps translate glyph names to Unicode…'
complete -c otftotfm -s V -l verbose --description 'Write progress messages to standard error.  \' . Sp.'
complete -c otftotfm -l no-create --description 'Do not create or modify any files.'
complete -c otftotfm -l force --description 'Generate all files, even if it looks like versions are already installed.  \' .'
complete -c otftotfm -s q -l quiet --description 'Do not generate any error messages.  \' . Sp.'
complete -c otftotfm -l kpathsea-debug --description 'Set path searching debugging flags.   See the  Kpathsea manual for details.'
complete -c otftotfm -s h -l help --description 'Print usage information and exit.  \' . Sp.'
complete -c otftotfm -l subs-filter --description '.'
complete -c otftotfm -l include-subs --description '.'
complete -c otftotfm -l exclude-subs --description '.'
complete -c otftotfm -l include --description 'patterns, and none of the.'
complete -c otftotfm -l exclude --description 'patterns.   Each pattern applies to all following features, except that the.'
complete -c otftotfm -l clear --description 'option clears any accumulated patterns.   The.'
complete -c otftotfm -l proportional-width --description '.'
complete -c otftotfm -s 1 --description 'between versions of a character.'
complete -c otftotfm -l alternates-filter --description '.'
complete -c otftotfm -l include-alternates --description '.'
complete -c otftotfm -l exclude-alternates --description '.'
complete -c otftotfm -l tfm-directory --description '.'
complete -c otftotfm -l pl-directory --description '.'
complete -c otftotfm -l vf-directory --description '.'
complete -c otftotfm -l vpl-directory --description '.'
complete -c otftotfm -l encoding-directory --description '.'
complete -c otftotfm -l type1-directory --description '.'
complete -c otftotfm -l truetype-directory --description '.'
complete -c otftotfm -l version --description 'Print the version number and some short non-warranty information and exit.'
complete -c otftotfm -l '*-filter' --description 'variants, accept the following types of pattern.'
complete -c otftotfm -s g --description 'option to see a font\'s glyph names, and "cfftot1 font.'

