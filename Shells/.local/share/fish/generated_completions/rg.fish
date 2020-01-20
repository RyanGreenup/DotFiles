# rg
# Autogenerated from man page /usr/share/man/man1/rg.1
complete -c rg -s A -l after-context --description 'Show NUM lines after each match. sp This overrides the --context flag.'
complete -c rg -l auto-hybrid-regex --description 'When this flag is used, ripgrep will dynamically choose between supported reg…'
complete -c rg -s B -l before-context --description 'Show NUM lines before each match. sp This overrides the --context flag.'
complete -c rg -l binary --description 'Enabling this flag will cause ripgrep to search binary files.'
complete -c rg -l block-buffered --description 'When enabled, ripgrep will use block buffering.'
complete -c rg -s b -l byte-offset --description 'Print the 0-based byte offset within the input file before each line of outpu…'
complete -c rg -s s -l case-sensitive --description 'Search case sensitively.'
complete -c rg -l color --description 'This flag controls when to use colors.'
complete -c rg -l colors --description 'This flag specifies color settings for use in the output.'
complete -c rg -l column --description 'Show column numbers (1-based).'
complete -c rg -s C -l context --description 'Show NUM lines before and after each match.'
complete -c rg -l context-separator --description 'The string used to separate non-contiguous context lines in the output.'
complete -c rg -s c -l count --description 'This flag suppresses normal output and shows the number of lines that match t…'
complete -c rg -l count-matches --description 'This flag suppresses normal output and shows the number of individual matches…'
complete -c rg -l crlf --description 'When enabled, ripgrep will treat CRLF (rn) as a line terminator instead of ju…'
complete -c rg -l debug --description 'Show debug messages.  Please use this when filing a bug report.'
complete -c rg -l dfa-size-limit --description 'The upper size limit of the regex DFA.  The default limit is 10M.'
complete -c rg -s E -l encoding --description 'Specify the text encoding that ripgrep will use on all files searched.'
complete -c rg -s f -l file --description 'Search for patterns from the given file, with one pattern per line.'
complete -c rg -l files --description 'Print each file that would be searched without actually performing the search.'
complete -c rg -s l -l files-with-matches --description 'Only print the paths with at least one match.'
complete -c rg -l files-without-match --description 'Only print the paths that contain zero matches.'
complete -c rg -s F -l fixed-strings --description 'Treat the pattern as a literal string instead of a regular expression.'
complete -c rg -s L -l follow --description 'When this flag is enabled, ripgrep will follow symbolic links while traversin…'
complete -c rg -s g -l glob --description 'Include or exclude files and directories for searching that match the given g…'
complete -c rg -l glob-case-insensitive --description 'Process glob patterns given with the -g/--glob flag case insensitively.'
complete -c rg -l heading --description 'This flag prints the file path above clusters of matches from each file inste…'
complete -c rg -l hidden --description 'Search hidden files and directories.'
complete -c rg -l iglob --description 'Include or exclude files and directories for searching that match the given g…'
complete -c rg -s i -l ignore-case --description 'When this flag is provided, the given patterns will be searched case insensit…'
complete -c rg -l ignore-file --description 'Specifies a path to one or more . gitignore format rules files.'
complete -c rg -l ignore-file-case-insensitive --description 'Process ignore files (. gitignore, . ignore, etc. ) case insensitively.'
complete -c rg -s v -l invert-match --description 'Invert matching.  Show lines that do not match the given patterns.'
complete -c rg -l json --description 'Enable printing results in a JSON Lines format.'
complete -c rg -l line-buffered --description 'When enabled, ripgrep will use line buffering.'
complete -c rg -s n -l line-number --description 'Show line numbers (1-based).'
complete -c rg -s x -l line-regexp --description 'Only show matches surrounded by line boundaries.'
complete -c rg -s M -l max-columns --description 'Don\\(cqt print lines longer than this limit in bytes.'
complete -c rg -l max-columns-preview --description 'When the --max-columns flag is used, ripgrep will by default completely repla…'
complete -c rg -s m -l max-count --description 'Limit the number of matching lines per file searched to NUM.'
complete -c rg -l max-depth --description 'Limit the depth of directory traversal to NUM levels beyond the paths given.'
complete -c rg -l max-filesize --description 'Ignore files larger than NUM in size.  This does not apply to directories.'
complete -c rg -l mmap --description 'Search using memory maps when possible.'
complete -c rg -s U -l multiline --description 'Enable matching across multiple lines.'
complete -c rg -l multiline-dotall --description 'This flag enables "dot all" in your regex pattern, which causes .'
complete -c rg -l no-config --description 'Never read configuration files.'
complete -c rg -s I -l no-filename --description 'Never print the file path with the matched lines.'
complete -c rg -l no-heading --description 'Don\\(cqt group matches by each file.'
complete -c rg -l no-ignore --description 'Don\\(cqt respect ignore files (. gitignore, . ignore, etc. ).'
complete -c rg -l no-ignore-dot --description 'Don\\(cqt respect . ignore files.'
complete -c rg -l no-ignore-global --description 'Don\\(cqt respect ignore files that come from "global" sources such as git\\(cq…'
complete -c rg -l no-ignore-messages --description 'Suppresses all error messages related to parsing ignore files such as .'
complete -c rg -l no-ignore-parent --description 'Don\\(cqt respect ignore files (. gitignore, . ignore, etc.'
complete -c rg -l no-ignore-vcs --description 'Don\\(cqt respect version control ignore files (. gitignore, etc. ).'
complete -c rg -s N -l no-line-number --description 'Suppress line numbers.'
complete -c rg -l no-messages --description 'Suppress all error messages related to opening and reading files.'
complete -c rg -l no-mmap --description 'Never use memory maps, even when they might be faster.'
complete -c rg -l no-pcre2-unicode --description 'When PCRE2 matching is enabled, this flag will disable Unicode mode, which is…'
complete -c rg -s 0 -l null --description 'Whenever a file path is printed, follow it with a NUL byte.'
complete -c rg -l null-data --description 'Enabling this option causes ripgrep to use NUL as a line terminator instead o…'
complete -c rg -l one-file-system --description 'When enabled, ripgrep will not cross file system boundaries relative to where…'
complete -c rg -s o -l only-matching --description 'Print only the matched (non-empty) parts of a matching line, with each such p…'
complete -c rg -l passthru --description 'Print both matching and non-matching lines.'
complete -c rg -l path-separator --description 'Set the path separator to use when printing file paths.'
complete -c rg -s P -l pcre2 --description 'When this flag is present, ripgrep will use the PCRE2 regex engine instead of…'
complete -c rg -l pcre2-version --description 'When this flag is present, ripgrep will print the version of PCRE2 in use, al…'
complete -c rg -l pre --description 'For each input FILE, search the standard output of COMMAND FILE rather than t…'
complete -c rg -l pre-glob --description 'This flag works in conjunction with the --pre flag.'
complete -c rg -s p -l pretty --description 'This is a convenience alias for --color always --heading --line-number.'
complete -c rg -s q -l quiet --description 'Do not print anything to stdout.'
complete -c rg -l regex-size-limit --description 'The upper size limit of the compiled regex.  The default limit is 10M.'
complete -c rg -s e -l regexp --description 'A pattern to search for.'
complete -c rg -s r -l replace --description 'Replace every match with the text given when printing results.'
complete -c rg -s z -l search-zip --description 'Search in compressed files.'
complete -c rg -s S -l smart-case --description 'Searches case insensitively if the pattern is all lowercase.'
complete -c rg -l sort --description 'This flag enables sorting of results in ascending order.'
complete -c rg -l sortr --description 'This flag enables sorting of results in descending order.'
complete -c rg -l stats --description 'Print aggregate statistics about this ripgrep search.'
complete -c rg -s a -l text --description 'Search binary files as if they were text.'
complete -c rg -s j -l threads --description 'The approximate number of threads to use.'
complete -c rg -l trim --description 'When set, all ASCII whitespace at the beginning of each line printed will be …'
complete -c rg -s t -l type --description 'Only search files matching TYPE.  Multiple type flags may be provided.'
complete -c rg -l type-add --description 'Add a new glob for a particular file type.'
complete -c rg -l type-clear --description 'Clear the file type globs previously defined for TYPE.'
complete -c rg -l type-list --description 'Show all supported file types and their corresponding globs.'
complete -c rg -s T -l type-not --description 'Do not search files matching TYPE.  Multiple type-not flags may be provided.'
complete -c rg -s u -l unrestricted --description 'Reduce the level of "smart" searching.  A single -u won\\(cqt respect .'
complete -c rg -l vimgrep --description 'Show results with every match on its own line, including line numbers and col…'
complete -c rg -s H -l with-filename --description 'Display the file path for matches.'
complete -c rg -s w -l word-regexp --description 'Only show matches surrounded by word boundaries.'
complete -c rg -o a/--text --description 'flag.'
complete -c rg -o u/--unrestricted --description 'flag is provided for a third time, then this flag is automatically enabled.'
complete -c rg -l no-binary --description '.'
complete -c rg -l no-max-columns-preview --description '.'
complete -c rg -o xdev --description 'or.'
complete -c rg -o mount --description 'flag.'
complete -c rg -o U/--multiline --description 'flag, then ripgrep will silently fail to match anything instead of reporting …'
complete -c rg -l no-pre --description 'flag will disable this behavior.'
complete -c rg -o foo --description 'rg -e -foo You can also use the special.'
complete -c rg -l no-text --description '.'

