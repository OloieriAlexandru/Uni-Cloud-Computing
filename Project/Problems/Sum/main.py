
with open("sum.in", "r") as file_in:
    line = file_in.readline().strip()
    a, b = line.split(' ')

with open("sum.out", "w") as file_out:
    file_out.write(str(a + b))
