# JSON <-> CSV converter samples

Two dependency-free Python 3 CLIs.

## json2csv.py
`python3 samples/json2csv.py input.json -o out.csv`
- flatten nested objects with dot notation
- ragged keys -> union of columns
- JSON Lines input, stdin support, `--columns` ordering

## csv2json.py
`python3 samples/csv2json.py input.csv -o out.json`

Both handle UTF-8 BOM and empty input.
