from selenium import webdriver
from selenium.webdriver.common.by import By
from openpyxl import Workbook
import time

wb = Workbook()
ws = wb.active

ws.append(["Test Case", "Result"])

driver = webdriver.Chrome()

try:

    driver.get("https://mathan-freelancer.vercel.app/")

    ws.append(["Website Opened", "PASS"])

    time.sleep(5)

    # CHECK LINKS
    links = driver.find_elements(By.TAG_NAME, "a")

    if len(links) > 0:
        ws.append(["Links Found", "PASS"])
    else:
        ws.append(["Links Found", "FAIL"])

    # CHECK BUTTONS
    buttons = driver.find_elements(By.TAG_NAME, "button")

    if len(buttons) > 0:
        ws.append(["Buttons Found", "PASS"])
    else:
        ws.append(["Buttons Found", "FAIL"])

    # CHECK INPUTS
    inputs = driver.find_elements(By.TAG_NAME, "input")

    if len(inputs) >= 2:

        inputs[0].send_keys("Mathan")
        inputs[1].send_keys("mathan@gmail.com")

        ws.append(["Input Fields", "PASS"])

    else:
        ws.append(["Input Fields", "FAIL"])

    # MESSAGE
    textarea = driver.find_element(By.TAG_NAME, "textarea")

    textarea.send_keys("Automation Testing")

    ws.append(["Message Field", "PASS"])

    # SEND BUTTON
    if len(buttons) > 0:

        buttons[-1].click()

        ws.append(["Send Button", "PASS"])

    time.sleep(5)

    page = driver.page_source.lower()

    if "success" in page or "sent" in page:
        ws.append(["Message Sent", "PASS"])
    else:
        ws.append(["Message Sent", "FAIL"])

except Exception as e:

    ws.append(["ERROR", str(e)])

driver.quit()

wb.save("report.xlsx")

print("Automation Completed")