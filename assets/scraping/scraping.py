# Pyhton data scraping code for fortunesDB

# run code in jupyter notebook with the following system calls

# import sys
# !{sys.executable} -m pip install requests
# !{sys.executable} -m pip install tqdm

import requests
import re
from bs4 import BeautifulSoup
from tqdm import tqdm
import time

fortunes = []

for i in tqdm (range(0, 17), desc= "Reading fortune data..."):
    current_page = i*50
    url = 'http://www.fortunecookiemessage.com/archive.php?start='+str(current_page) 
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    table = soup.find("table")
    all_quotes = table.findAll("a")
    for fortune in all_quotes:
        text = str(fortune.getText() )
        fortunes.append(text)
    
        
f = open("fortunes.txt",'w') 

for line in fortunes:
    if (line == "Fortune Cookie Quotes: "):
        continue
    line = line + "\n"
    f.write(line)
    
f.close()