# def myMethod():
#  print("This is a method")
# myMethod()
# myMethod()
# myMethod()

from  datetime import datetime
day = datetime.today().weekday()

if day == 5 or day == 6:
    print("Today is Sunday")
   
else:
    print("Today is a weekday")

