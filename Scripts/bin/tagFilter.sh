#!/bin/bash
# Don't forget to adjust the permissions with:
#chmod +x ~/somecrazyfolder/script1

# use spacemacs and:
  #Use C-c C-n and C-c C-x and C-c C-z and C-c C-( and sh-if and sh-for
  # There's also snippets, use =company-yasnippet=
    # LaTeX in Vim but Bash in emacs
        # Probably R in Rstudio (and some vim for math and maybe emacs for folding)



## Program

### Description
# This will search and filter tags in the ~/Notes directory, returning results into temporary file and working from that

### Code

     cd ~/Notes/MD/notes

## Help Statement
if [ "$1" == "-h" ]; then
  echo "Usage: `basename $0` Will write temp files to manage filtering tags
               `basename $0 -s` Will Move the symlinked Tags"
  exit 0
elif [[ "$1" == *-s* ]]; then
     # restore the last TagValue
     tagval=$(cat /tmp/thelasttagfromTagFilter)
     # This is supposed to be run second,
     # In order to take the filtered tags and put them in the symlinked directory
     echo "Symlinking and Showing the Filtered tags"
     mkdir 00TagMatch
      rm 00TagMatch/*
      ln -s $(realpath $(cat 00TagMatchList)) ./00TagMatch; rm 00TagMatchList
      cd 00TagMatch;
      marktext . & disown; sag -f "\s#$tagval" ./
else
    # This is supposed to be run first, as many times as necessary
    # It will filter out the tags

      # Make new line Characters seperators for for loops
      IFS=$'\n'

      # Make a temp file to store results if necessary
     if test -f 00TagMatchList; then
            	echo "subsequent search";
     else
            	ls *.md > 00TagMatchList;
     fi
     
     # Have the user choose a tag from all the tag matches
     tagval=$(for i in $(cat 00TagMatchList); do
        rg --pcre2 --sort-files --no-filename '(?<=[\n\s]#)[a-zA-z]+(?=[\s\n$])' -o $i;
     done | sort -u | fzf)

     # Return any files that contain that tag 
       # TODO join this with the above step for efficiency
     cat 00TagMatchList | xargs rg ":$tagval:|\s#$tagval\s" -l > 00TagMatchList;
     
     # Space 
     echo "
     
     "

     # Print Tags
     bat 00TagMatchList

     # Save the last used tag so you can use `ag` on the preview later with it
     echo $tagval > /tmp/thelasttagfromTagFilter
     
     exit 0
fi

## vim:fdm=expr:fdl=0
## vim:fde=getline(v\:lnum)=~'^##'?'>'.(matchend(getline(v\:lnum),'##*')-2)\:'='



# If you need GNU tools, use grep not ripgrep
    # grep -P --no-filename '(?<=[\n\s]#)[a-zA-z]+(?=[\s\n$])' -o $i;