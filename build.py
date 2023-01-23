import argparse
import os

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("template", help = "the HTML file to be used for the template")
    parser.add_argument("output", help = "the output file")
    args = parser.parse_args()

    build = SingleFileParser()
    output = build.parse(args.template)

    print(f"parse complete. outputting to '{args.output}'")
    with open(args.output, "w") as f:
        f.write(output)


class SingleFileParser:
    def parse(self, template_file):
        self.output = ""
        self.working_dir = ""
        self.parse_template(template_file)

        return self.output

    def parse_template(self, path):
        print(f"parsing '{os.path.normpath(os.path.join(self.working_dir, path))}'")
        
        wd = self.working_dir
        lines = self.read_lines(path)
        self.working_dir = os.path.dirname(path)

        for line in lines:
            split = line.strip().split()

            if len(split) == 0:
                self.output += "\n"
                continue
            
            if split[0].startswith("//#"):
                command = split.pop(0).removeprefix("//#").strip()
                self.parse_template_command(command, split)
                continue
            
            self.output += line

        self.working_dir = wd

    def parse_template_command(self, command, args):
        match command:
            case "style":
                style_path = self.cmd_require_arg(0, args, "expected path to stylesheet")

                self.output += "<style>\n"
                self.parse_template(style_path)
                self.output += "\n</style>\n"

                return
            
            case "script":
                script_path = self.cmd_require_arg(0, args, "expected path to script")

                self.output += "<script>\n"
                self.parse_template(script_path)
                self.output += "\n</script>\n"

                return

            case "include":
                script_path = self.cmd_require_arg(0, args, "expected path")

                self.output += "\n"
                self.parse_template(script_path)
                self.output += "\n"

                return

        print(f"error: invalid command: '{command}'")
        self.output += "\n"

    def parse_js_template_command(self, command, args):
        pass

    # Utility functions

    def read_lines(self, path):
        lines = []
        wd_path = os.path.join(self.working_dir, path)

        with open(wd_path, "r") as f:
            lines = f.readlines()

        return lines

    def cmd_require_arg(self, index, args, msg):
        if index >= len(args):
            raise RuntimeError(f"missing command argument: {msg}")

        return args[index]

if __name__ == "__main__":
    main()