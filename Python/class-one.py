# 05Nov2025
# Using while loop

# num = int(input("Enter a number: "))

# numbers = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1]
# roman = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"]

# i = 0
# result = ""

# while num > 0:
#     if num >= numbers[i]:
#         result += roman[i]
#         num -= numbers[i]
#     else:
#         i += 1

# print("Roman numeral:", result)


import math

roman = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"]
num = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1]

def userInput():
    number = int(input("Enter a number: "))
    return number

def convertToRoman(number):
    row = ""
    i = 0
    while i < 13:
        value = math.floor(number / num[i])
        j = 0
        while j < value:
            row += roman[i]
            j += 1
        number = number % num[i]
        i += 1
    print("Roman numeral:", row)

a = userInput()
convertToRoman(a)
