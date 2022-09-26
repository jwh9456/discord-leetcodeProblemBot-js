import sqlite3 as sl3

con = sl3.connect('./freelancerData.db')

cur = con.cursor()

cur.execute("SELECT * FROM freelancer")

for row in cur:
    print(row)