export const BOILERPLATE_CODE: Record<string, string> = {
  javascript: `// JavaScript Boilerplate
console.log("Hello, CodeVamp!");

// Example function
function greet(name) {
  return \`Welcome, \${name}!\`;
}

console.log(greet("Developer"));`,

  python: `# Python Boilerplate
print("Hello, CodeVamp!")

# Example function
def greet(name):
    return f"Welcome, {name}!"

print(greet("Developer"))`,

  cpp: `// C++ Boilerplate
#include <iostream>
using namespace std;

int main() {
    cout << "Hello, CodeVamp!" << endl;
    
    // Example function
    string name = "Developer";
    cout << "Welcome, " << name << "!" << endl;
    
    return 0;
}`,

  java: `// Java Boilerplate
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, CodeVamp!");
        
        // Example function
        String name = "Developer";
        System.out.println("Welcome, " + name + "!");
    }
}`,

  c: `// C Boilerplate
#include <stdio.h>

int main() {
    printf("Hello, CodeVamp!\\n");
    
    // Example function
    char name[] = "Developer";
    printf("Welcome, %s!\\n", name);
    
    return 0;
}`
};