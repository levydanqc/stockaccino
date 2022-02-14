#!/usr/bin/python3
""" 
https://github.com/levydanqc/markdownGenerator.git

Générateur de markDown avec variables.
"""
from re import sub, compile, findall
import sys
import os.path

if (len(sys.argv) != 3):
    print("Utilisation: generate.py <source file> <output file>")
    print("\t<source file> : fichier source à parser")
    print("\t<output file> : fichier de sortie")
    print("Fermeture du programme.")
    sys.exit(1)

if (os.path.isfile(sys.argv[1]) == False):
    print("Le fichier source n'existe pas.")
    print("Fermeture du programme.")
    sys.exit(1)

if (os.path.isfile(sys.argv[2]) == True):
    print(f"Un fichier du nom {str(sys.argv[2])} existe déjà.")
    if (["y", "yes"].count(input("Voulez-vous le remplacer ? (y/n)").lower()) == 0):
        print("Fermeture du programme.")
        sys.exit(1)

markdown = []
variables = {}
with open(sys.argv[1]) as input:
    while (line := input.readline()) and line != "$$ Variables $$\n":
        markdown.append(line)
    while line := input.readline():
        var = line.split("=")
        variables[var[0].strip()] = var[1].strip()

with open(sys.argv[2], "w") as output:
    pattern = compile(r'(\$.[\w]+)')
    for line in markdown:
        for match in findall(pattern, line):
            line = line.replace(match, variables[match[1:]])
        output.write(line)

print("Génération terminée.")
