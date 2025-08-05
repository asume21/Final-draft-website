import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CodeEditorProps {
  code: string;
  language: string;
  onChange?: (code: string) => void;
  readOnly?: boolean;
  className?: string;
}

export function CodeEditor({ 
  code, 
  language, 
  onChange, 
  readOnly = false,
  className 
}: CodeEditorProps) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      toast({
        title: "Code copied!",
        description: "The code has been copied to your clipboard.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Failed to copy code to clipboard.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className={cn("relative bg-gray-900 border border-gray-700 rounded-lg overflow-hidden", className)}>
      {/* Header */}
      <div className="flex items-center justify-between bg-gray-800 px-4 py-2 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="ml-2 text-sm text-gray-400">{language}</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="text-gray-400 hover:text-white"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </Button>
      </div>

      {/* Code Content */}
      <div className="p-4">
        {readOnly ? (
          <pre className="text-sm font-mono text-gray-300 whitespace-pre-wrap overflow-auto">
            <code>{code}</code>
          </pre>
        ) : (
          <textarea
            value={code}
            onChange={(e) => onChange?.(e.target.value)}
            className="w-full h-64 bg-transparent text-sm font-mono text-gray-300 resize-none focus:outline-none"
            spellCheck={false}
          />
        )}
      </div>
    </div>
  );
}