## Development Environment [#7](https://github.com/admiralarjun/logalyzer/issues/7)
- - -

### Clonning
- - -
Clone your forked repo, before clonning or making change make sure to sync your fork so that it will have the latest updated code. This will also avoid push conflicts.

### Managing Dependencies
- - -
We will manage dependencies in Django is to use a virtual environment. A virtual environment is a isolated Python environment that contains its own set of dependencies. This can be useful for preventing conflicts between different projects that you are working on. 

1. To create a virtual environment, you can use the following command:

```
python -m venv venv
```

2. Once you have created a virtual environment, you can activate it by running the following command:

For *Unix:
```
source venv/bin/activate
```

For Windows:
```
activate
```

3. Once you have activated the virtual environment, you can install the dependencies for your project by running the following command:

```
pip install -r requirements.txt
```

4. If you install anymore dependancies in your development process, make sure to reflect that in the requirements.txt file so that other devs will not freak their brain figuring out what's happening. To do so, execute the following command and after that make your PRs. 

```
pip freeze > requirements.txt
```

Note: This command will overwrite the file, so make sure you execute this in correct directory and all these things should be done only inside your venv.