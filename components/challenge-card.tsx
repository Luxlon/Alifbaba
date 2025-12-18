"use client";

import { Challenge, type ChallengeOption } from "@/types/database";
import { Button } from "@/components/ui/button";
import { AudioPlayer } from "@/components/audio-player";
import { useState } from "react";

interface ChallengeCardProps {
  challenge: Challenge;
  selectedOptions: string[];
  onSelectOption: (optionId: string) => void;
  disabled?: boolean;
}

export const ChallengeCard = ({
  challenge,
  selectedOptions,
  onSelectOption,
  disabled = false,
}: ChallengeCardProps) => {
  const isMultiSelect = challenge.type === "SELECT_ALL";

  return (
    <div className="max-w-2xl mx-auto">
      {/* Challenge Question */}
      <h2 className="text-2xl font-bold mb-8 text-center">
        {challenge.question}
      </h2>

      {/* Audio Player for LISTENING type */}
      {challenge.type === "LISTENING" && challenge.audioUrl && (
        <div className="mb-8 flex justify-center">
          <AudioPlayer audioUrl={challenge.audioUrl} variant="button" size="lg" />
        </div>
      )}

      {/* Type indicator for SELECT_ALL */}
      {isMultiSelect && (
        <div className="mb-4 text-center">
          <span className="inline-block bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">
            Pilih semua jawaban yang benar
          </span>
        </div>
      )}

      {/* Options */}
      <div className="space-y-3">
        {challenge.options.map((option) => {
          const isSelected = selectedOptions.includes(option.id);

          return (
            <ChallengeOption
              key={option.id}
              option={option}
              isSelected={isSelected}
              isMultiSelect={isMultiSelect}
              onSelect={() => onSelectOption(option.id)}
              disabled={disabled}
              challengeType={challenge.type}
            />
          );
        })}
      </div>
    </div>
  );
};

interface ChallengeOptionProps {
  option: ChallengeOption;
  isSelected: boolean;
  isMultiSelect: boolean;
  onSelect: () => void;
  disabled: boolean;
  challengeType: Challenge["type"];
}

const ChallengeOption = ({
  option,
  isSelected,
  isMultiSelect,
  onSelect,
  disabled,
  challengeType,
}: ChallengeOptionProps) => {
  return (
    <button
      onClick={onSelect}
      disabled={disabled}
      className={`
        w-full p-6 rounded-xl border-2 text-left transition-all
        ${
          isSelected
            ? "border-emerald-500 bg-emerald-50 shadow-md"
            : "border-gray-200 hover:border-emerald-300 hover:bg-emerald-50/50"
        }
        ${disabled ? "opacity-50 cursor-not-allowed" : "hover:shadow-md"}
      `}
    >
      <div className="flex items-center gap-4">
        {/* Selection Indicator */}
        <div
          className={`
            w-6 h-6 flex items-center justify-center rounded-full border-2 transition-all
            ${isSelected ? "border-emerald-500 bg-emerald-500" : "border-gray-300"}
          `}
        >
          {isSelected && (
            <div className="w-3 h-3 rounded-full bg-white" />
          )}
        </div>

        {/* Option Content */}
        <div className="flex-1">
          {challengeType === "LISTENING" ? (
            <div className="hijaiyah-letter text-4xl">{option.text}</div>
          ) : (
            <div className="text-lg font-medium">{option.text}</div>
          )}
        </div>

        {/* Audio Button (if option has audio) */}
        {option.audioUrl && (
          <div onClick={(e) => e.stopPropagation()}>
            <AudioPlayer
              audioUrl={option.audioUrl}
              variant="inline"
              size="sm"
            />
          </div>
        )}
      </div>
    </button>
  );
};

// Result feedback component
interface ChallengeResultProps {
  isCorrect: boolean;
  correctAnswers?: ChallengeOption[];
  onContinue: () => void;
}

export const ChallengeResult = ({
  isCorrect,
  correctAnswers,
  onContinue,
}: ChallengeResultProps) => {
  return (
    <div
      className={`
        fixed bottom-0 left-0 right-0 p-6 border-t-4
        ${isCorrect ? "bg-emerald-50 border-emerald-500" : "bg-red-50 border-red-500"}
      `}
    >
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-4xl">
            {isCorrect ? "✅" : "❌"}
          </div>
          <div>
            <div className="font-bold text-xl">
              {isCorrect ? "Benar!" : "Belum Tepat"}
            </div>
            <div className="text-sm text-muted-foreground">
              {isCorrect
                ? "Jawaban kamu tepat! Lanjutkan!"
                : "Coba lagi, kamu pasti bisa!"}
            </div>
            {!isCorrect && correctAnswers && correctAnswers.length > 0 && (
              <div className="text-sm mt-1">
                Jawaban benar:{" "}
                <span className="font-medium">
                  {correctAnswers.map((a) => a.text).join(", ")}
                </span>
              </div>
            )}
          </div>
        </div>
        <Button
          onClick={onContinue}
          size="lg"
          variant={isCorrect ? "default" : "danger"}
          className="min-w-[120px]"
        >
          Lanjut
        </Button>
      </div>
    </div>
  );
};
