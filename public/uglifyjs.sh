#!/bin/bash
FILES=js/*
for f in $FILES
do
	if [[ "$f" != *min* ]]
	then
		if [[ $f =~ (.*)\.js$ ]]
		then
			echo "Uglifying ${BASH_REMATCH[1]}.min.js..."
			uglifyjs $f -o "${BASH_REMATCH[1]}.min.js"
			echo "Done!"
		fi
	fi
done