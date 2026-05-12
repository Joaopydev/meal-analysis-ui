import { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, Platform } from 'react-native';
import { cn } from '../utils/cn';
import { Eye, EyeOff, Key } from 'lucide-react-native';

interface IInputProps extends React.ComponentProps<typeof TextInput> {
  mask?: string;
  label?: string;
  append?: string;
  error?: string;
  isPasswordInput?: boolean;
}

export function Input({ className, mask, onChangeText, label, append, error, isPasswordInput, ...props }: IInputProps) {
  const [maskedValue, setMaskedValue] = useState('');
  const [hidePassword, setHidePassword] = useState(true)

  function handleHidePassword() {
    setHidePassword(!hidePassword)
  }
  
  function handleChangeText(text: string) {
    const value = mask ? applyMask(text, mask) : text;

    setMaskedValue(value);
    onChangeText?.(value);
  }

  return (
    <View className="gap-2">
      {label && (
        <Text className="text-base font-sans-medium to-black-700">{label}</Text>
      )}

      <View className="gap-2 flex-row">
        <TextInput
          className={cn(
            'h-[52px] p-3.5 flex-1 border border-gray-400 rounded-[10px] text-black-700 focus:border-black-700',
            isPasswordInput && 'pr-12',
            !!error && 'border-support-red',
            className,
          )}
          value={mask ? maskedValue : props.value}
          onChangeText={handleChangeText}
          secureTextEntry={isPasswordInput ? hidePassword : props.secureTextEntry}
          {...props}
        />

        {isPasswordInput && (
          <View className="absolute right-4 h-full flex items-center justify-center">
            <TouchableOpacity>
                {hidePassword 
                  ? <EyeOff size={20} onPress={handleHidePassword}/>
                  : <Eye size={20} onPress={handleHidePassword}/>
                }
            </TouchableOpacity>
          </View>
        )}

        {append && (
          <View className="size-[52px] items-center justify-center text-center rounded-[10px] bg-gray-400">
            <Text className="text-base font-sans-regular text-gray-700">{append}</Text>
          </View>
        )}
      </View>
      {error && <Text className="text-support-red font-sans-regular text-sm">{error}</Text>}
    </View>
  );
}

function applyMask(value: string, mask: string): string {
  const cleanValue = value.replace(/\D/g, '');
  let result = '';
  let j = 0;

  for (let i = 0; i < mask.length && j < cleanValue.length; i++) {
    if (mask[i] === '9') {
      result += cleanValue[j++];
    } else {
      result += mask[i];
    }
  }

  return result;
}