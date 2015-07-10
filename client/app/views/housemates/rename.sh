for file in *.html.erb; do
    mv "$file" "`basename $file .html.erb`.hbs"
done
